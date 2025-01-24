import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Expense } from "../models/expense.model";
import { ACTIONS } from "../constants";
interface IExpenseListProps {
  expenses: Expense[];
  loadMore: any;
  categoryMap: any;
  setSelectedExpense: any;
  setAction: any;
}

export const ExpenseList: FC<IExpenseListProps> = ({
  expenses,
  loadMore,
  categoryMap,
  setSelectedExpense,
  setAction,
}) => {
  return (
    <>
      <InfiniteScroll
        dataLength={expenses.length}
        next={loadMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="max-h-screen overflow-auto bg-gray-100 p-4"
      >
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-4"
          >
            {/* Left Section: Item Name, Category, Price */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <p className="font-semibold text-gray-800">{expense.item_name}</p>
              <p className="text-gray-600 text-sm">
                Category: {categoryMap[expense.category_id]}
              </p>
              <p className="text-gray-600 text-sm">Price: ${expense.cost}</p>
            </div>

            {/* Right Section: Edit and Delete Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setAction(ACTIONS.EDIT);
                  setSelectedExpense(expense);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setAction(ACTIONS.DELETE);
                  setSelectedExpense(expense);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};
