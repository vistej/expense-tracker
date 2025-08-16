import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CategoryMap, Expense } from "../models/expense.model";
import { ACTIONS } from "../constants";
import Loading from "./Loading";
import { getCategoryIcon } from "../utils/categoryUtils";
import { formatDate, formatShortDate } from "../utils/dateUtils";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface ExpenseListProps {
  expenses: Expense[];
  loadMore: () => void;
  categoryMap: CategoryMap;
  setSelectedExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  hasMore: boolean;
}

export const ExpenseList: FC<ExpenseListProps> = ({
  expenses,
  loadMore,
  categoryMap,
  setSelectedExpense,
  setAction,
  hasMore,
}) => {
  const getView = (expenses: Expense[]) => {
    let currentDate: string = "";

    return expenses.map((expense) => {
      const expenseDate = new Date(expense.date).toLocaleDateString();
      const showDate = currentDate !== expenseDate;

      if (showDate) {
        currentDate = expenseDate;
      }

      const { icon: Icon, bgColor, textColor } = getCategoryIcon(categoryMap[expense.category_id]);

      return (
        <div key={expense.id} className="mb-4">
          {/* Date Header */}
          {showDate && (
            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <h3 className="text-lg font-display font-semibold text-text">
                  {formatDate(expense.date)}
                </h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>
            </div>
          )}

          {/* Expense Card */}
          <div className="card hover-glow transition-all duration-200 group">
            <div className="flex items-start justify-between">
              {/* Left Section: Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-text mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {expense.item_name}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      {/* Category */}
                      <div className="flex items-center space-x-2">
                        <TagIcon className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">Category:</span>
                        <span className="font-medium text-text">
                          {categoryMap[expense.category_id]}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">Date:</span>
                        <span className="font-medium text-text">
                          {formatShortDate(expense.date)}
                        </span>
                      </div>

                      {/* Cost */}
                      <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">Amount:</span>
                        <span className="font-bold text-lg text-primary-600">
                          ${expense.cost.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {expense.description && (
                      <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                        <p className="text-sm text-text-muted">
                          {expense.description}
                        </p>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="flex items-center space-x-4 mt-3 text-xs text-text-muted">
                      {expense.recurring && (
                        <span className="inline-flex items-center space-x-1">
                          <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                          <span>Recurring ({expense.recurrence_period})</span>
                        </span>
                      )}
                      <span>Added by {expense.created_by}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => {
                    setAction(ACTIONS.EDIT);
                    setSelectedExpense(expense);
                  }}
                  className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 group/btn"
                  title="Edit expense"
                >
                  <PencilIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => {
                    setAction(ACTIONS.DELETE);
                    setSelectedExpense(expense);
                  }}
                  className="p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-all duration-200 group/btn"
                  title="Delete expense"
                >
                  <TrashIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={expenses.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        }
        endMessage={
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-text-muted font-medium">
              {expenses.length > 0 ? "You've reached the end of your expenses" : "No expenses to show"}
            </p>
          </div>
        }
        className="space-y-2"
        scrollThreshold={0.95}
      >
        {getView(expenses)}
      </InfiniteScroll>
    </div>
  );
};
