import { FC } from "react";
import DateRange from "./DateRange";
import DropDown from "./Dropdown";
import { Filter } from "../models/expense.model";
import { useCategories } from "../context/categoryContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ExpensesFilterProps {
  filter: Filter;
  updateFilter: (filter: Filter) => void;
  onSearch: () => void;
}

const ExpensesFilter: FC<ExpensesFilterProps> = ({ filter, updateFilter, onSearch }) => {
  const { categories } = useCategories();

  const setSelectedCategories = (cats: string[]) => {
    const nf: Filter = { ...filter, category_ids: cats };
    updateFilter(nf);
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Date Range
          </label>
          <DateRange filter={filter} updateFilter={updateFilter} />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Categories
          </label>
          <DropDown data={categories} onChange={setSelectedCategories} />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            className="w-full btn-primary flex items-center justify-center space-x-2"
            onClick={onSearch}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filter.category_ids.length > 0 ||
        filter.start_date !== new Date(new Date().getFullYear() - 1, 0, 1) ||
        filter.end_date !== new Date()) && (
          <div className="pt-4 border-t border-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-muted">Active filters:</span>

              {/* Date Range Display */}
              <span className="badge badge-primary">
                {filter.start_date.toLocaleDateString()} - {filter.end_date.toLocaleDateString()}
              </span>

              {/* Category Display */}
              {filter.category_ids.length > 0 && (
                <span className="badge badge-secondary">
                  {filter.category_ids.length} categor{filter.category_ids.length === 1 ? 'y' : 'ies'} selected
                </span>
              )}

              {/* Clear All Button */}
              <button
                onClick={() => updateFilter({
                  start_date: new Date(new Date().getFullYear() - 1, 0, 1),
                  end_date: new Date(),
                  category_ids: []
                })}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default ExpensesFilter;