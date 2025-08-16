import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ENDPOINTS } from "../constants";
import { CategoryCost, MonthCost } from "../models/dashboard.model";
import { CategoryChart } from "../components/CategoryChart";
import BarLineChart from "../components/BarLineChart";
import Loading from "../components/Loading";
import { useCategories } from "../context/categoryContext";
import { calculateYearToDateTotal, findTopCategory, getCategoryNameById, calculateAverageDaily } from "../utils/expenseUtils";
import { ChartBarIcon, ArrowTrendingUpIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

export const Dashboard: FC = () => {
  const [categoryCosts, setCategoryCosts] = useState<CategoryCost[]>([]);
  const [monthlyCosts, setMonthlyCosts] = useState<MonthCost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categories } = useCategories();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchCategoryCosts(), fetchMonthlyCosts()]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryCosts = async () => {
    try {
      const res = await api.get(ENDPOINTS.CATEGORY_COSTS);
      if (res.status === 200) {
        setCategoryCosts(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyCosts = async () => {
    try {
      const res = await api.get(ENDPOINTS.MONTHLY_COSTS);
      if (res.status === 200) {
        setMonthlyCosts(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const hasData = categoryCosts.length > 0 && monthlyCosts.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-large">
            <ChartBarIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-text mb-3">
            Welcome to Your Dashboard
          </h2>
          <p className="text-text-muted mb-6 leading-relaxed">
            Start adding expenses to see beautiful charts and insights about your spending patterns.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-center text-sm text-text-muted">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-2" />
              Track your spending habits
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted">
              <CalendarIcon className="w-4 h-4 mr-2" />
              View monthly trends
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted">
              <ChartBarIcon className="w-4 h-4 mr-2" />
              Analyze category breakdowns
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate year to date total
  const yearToDateTotal = calculateYearToDateTotal(monthlyCosts);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            Financial Dashboard
          </h1>
          <p className="text-text-muted text-lg">
            Track your spending patterns and financial insights
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Monthly Trends Chart */}
          <div className="card-elevated hover-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-text mb-1">
                  Last 12 Months Spending Trends
                </h3>
                <p className="text-text-muted">
                  Track your expenses over the past year
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="h-80">
              <BarLineChart monthlyCosts={monthlyCosts} />
            </div>
          </div>

          {/* Category Breakdown Chart */}
          <div className="card-elevated hover-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-text mb-1">
                  Last 12 Months by Category
                </h3>
                <p className="text-text-muted">
                  See where your money went over the past year
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
            <div className="h-80">
              <CategoryChart categoryCosts={categoryCosts} />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {monthlyCosts.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-gradient-primary text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total This Month</p>
                  <p className="text-2xl font-display font-bold">
                    ${monthlyCosts[monthlyCosts.length - 1]?.total_cost || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card bg-gradient-secondary text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Year to Date</p>
                  <p className="text-2xl font-display font-bold">
                    ${yearToDateTotal.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card bg-gradient-accent text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Top Category</p>
                  <p className="text-lg font-display font-semibold">
                    {(() => {
                      const { categoryId } = findTopCategory(categoryCosts);
                      return categoryId ? getCategoryNameById(categoryId, categories) : 'N/A';
                    })()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TagIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card bg-neutral-800 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Average Daily</p>
                  <p className="text-2xl font-display font-bold">
                    ${calculateAverageDaily(monthlyCosts[monthlyCosts.length - 1]?.total_cost || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
