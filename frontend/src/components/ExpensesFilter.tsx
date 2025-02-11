import { FC } from "react";
import DateRange from "./DateRange";
import DropDown from "./Dropdown";
import { Filter } from "../models/expense.model";
import { useCategories } from "../context/categoryContext";

interface ExpensesFilterProps {
  filter: Filter,
  updateFilter: (filter: Filter) => void
  onSearch: () => void

}

const ExpensesFilter: FC<ExpensesFilterProps> = ({ filter, updateFilter, onSearch }) => {
  const { categories } = useCategories();



  const setSelectedCategories = (cats: string[]) => {
    const nf: Filter = { ...filter, category_ids: cats }
    updateFilter(nf)
  }


  return (<div className="p-4 flex flex-col md:flex-row space-x-2 justify-between w-full md:w-3/4 ">
    <div className="w-full md:w-1/2">
      <DateRange filter={filter} updateFilter={updateFilter} />
    </div>
    <div className="w-full md:w-1/4">
      <DropDown data={categories} onChange={setSelectedCategories} />
    </div>
    <button
      className="w-full md:w-1/4 mt-6 py-1.5 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-all ease-in-out"
      onClick={onSearch}
    >Search</button>
  </div>);
}

export default ExpensesFilter;