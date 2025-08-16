import { CategoryCost, MonthCost } from '../models/dashboard.model';
import { isInCurrentYear } from './dateUtils';

/**
 * Calculate year-to-date total expenses from monthly costs
 * @param monthlyCosts - Array of monthly cost data
 * @returns Total expenses for the current year
 */
export const calculateYearToDateTotal = (monthlyCosts: MonthCost[]): number => {
  return monthlyCosts
    .filter((cost) => isInCurrentYear(cost.month))
    .reduce((total, cost) => total + Number(cost.total_cost), 0);
};

/**
 * Calculate total expenses for a specific month
 * @param monthlyCosts - Array of monthly cost data
 * @param monthIndex - Index of the month (0-based, -1 for current month)
 * @returns Total expenses for the specified month
 */
export const calculateMonthlyTotal = (
  monthlyCosts: MonthCost[],
  monthIndex: number = -1
): number => {
  if (monthlyCosts.length === 0) return 0;

  const targetIndex = monthIndex >= 0 ? monthIndex : monthlyCosts.length - 1;
  return monthlyCosts[targetIndex]?.total_cost || 0;
};

/**
 * Calculate average daily expenses for a month
 * @param monthlyTotal - Total expenses for the month
 * @param daysInMonth - Number of days in the month (default: 30)
 * @returns Average daily expenses
 */
export const calculateAverageDaily = (
  monthlyTotal: number,
  daysInMonth: number = 30
): number => {
  return Math.round(monthlyTotal / daysInMonth);
};

/**
 * Find the top spending category from category costs
 * @param categoryCosts - Array of category cost data
 * @returns Object containing top category ID and total amount
 */
export const findTopCategory = (
  categoryCosts: CategoryCost[]
): { categoryId: number | null; total: number } => {
  if (categoryCosts.length === 0) {
    return { categoryId: null, total: 0 };
  }

  // Group category costs by category_id and sum them
  const categoryTotals: Record<number, number> = {};
  categoryCosts.forEach((cost) => {
    const categoryId = cost.category_id;
    categoryTotals[categoryId] =
      (categoryTotals[categoryId] || 0) + Number(cost.total_cost);
  });

  // Find the category with highest total
  let topCategoryId: number | null = null;
  let maxTotal = 0;

  Object.entries(categoryTotals).forEach(([id, total]) => {
    if (total > maxTotal) {
      maxTotal = total;
      topCategoryId = Number(id);
    }
  });

  return { categoryId: topCategoryId, total: maxTotal };
};

/**
 * Get category name by ID from categories array
 * @param categoryId - The category ID to look up
 * @param categories - Array of available categories
 * @returns Category name or 'N/A' if not found
 */
export const getCategoryNameById = (
  categoryId: number,
  categories: Array<{ id: number; name: string }>
): string => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category?.name || 'N/A';
};

/**
 * Calculate total expenses across all categories
 * @param categoryCosts - Array of category cost data
 * @returns Total expenses across all categories
 */
export const calculateTotalCategoryExpenses = (
  categoryCosts: CategoryCost[]
): number => {
  return categoryCosts.reduce(
    (total, cost) => total + Number(cost.total_cost),
    0
  );
};

/**
 * Get unique category IDs from category costs
 * @param categoryCosts - Array of category cost data
 * @returns Array of unique category IDs
 */
export const getUniqueCategoryIds = (
  categoryCosts: CategoryCost[]
): number[] => {
  const uniqueIds = new Set(categoryCosts.map((cost) => cost.category_id));
  return Array.from(uniqueIds);
};
