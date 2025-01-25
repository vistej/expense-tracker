import { FC } from "react";
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
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getView = (expenses: Expense[]) => {
    let date: string = "";
    return expenses.map((expense) => {
      let showDate = false;
      if (date !== expense.created_at) {
        date = expense.created_at;
        showDate = true;
      }
      return (
        <div key={expense.id}>
          {/* Date Section */}
          {showDate && (
            <div className="bg-gray-200 p-2">
              <h2 className="text-sm font-semibold">
                {formatDate(expense.created_at)}
              </h2>
            </div>
          )}
          <div className="flex justify-between items-center bg-white shadow-md p-4 border-b border-gray-200">
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
        </div>
      );
    });
  };

  return (
    <div
      id="scrollableDiv"
      className="flex-1 w-3/4 overflow-y-auto h-full"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <InfiniteScroll
        dataLength={expenses.length}
        next={loadMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center text-gray-600">No more expenses to show</p>
        }
        className="p-4"
        scrollableTarget="scrollableDiv"
      >
        {getView(expenses)}
      </InfiniteScroll>
    </div>
  );
};
