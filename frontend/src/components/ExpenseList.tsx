import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CategoryMap, Expense } from "../models/expense.model";
import { ACTIONS } from "../constants";
import Loading from "./Loading";
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
      const td = new Date(expense.created_at).toLocaleDateString();
      if (date !== td) {
        date = td;
        showDate = true;
      }
      return (
        <div key={expense.id}>
          {/* Date Section */}
          {showDate && (
            <div className="bg-[var(--color-background)] p-2">
              <h2 className="text-sm font-semibold text-[var(--color-muted-text)]">
                {formatDate(expense.created_at)}
              </h2>
            </div>
          )}

          <div className="flex justify-between items-center bg-[var(--color-card-background)] shadow-md p-4 border-b border-[var(--color-border)]">
            {/* Left Section: Item Name, Category, Price */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <p className="font-semibold text-[var(--color-text)]">
                {expense.item_name}
              </p>
              <p className="text-[var(--color-muted-text)] text-sm">
                Category: {categoryMap[expense.category_id]}
              </p>
              <p className="text-[var(--color-muted-text)] text-sm">
                Price: ${expense.cost}
              </p>
            </div>

            {/* Right Section: Edit and Delete Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setAction(ACTIONS.EDIT);
                  setSelectedExpense(expense);
                }}
                className="bg-[var(--color-primary)] text-white px-3 py-1 rounded-md hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setAction(ACTIONS.DELETE);
                  setSelectedExpense(expense);
                }}
                className="bg-[var(--color-danger)] text-white px-3 py-1 rounded-md hover:bg-[var(--color-danger-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-danger)]"
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
      className="w-full md:w-3/4 overflow-y-auto h-screen"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <InfiniteScroll
        dataLength={expenses.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p className="text-center text-gray-600">No more expenses to show</p>
        }
        className="p-4"
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.95}
      >
        {getView(expenses)}
      </InfiniteScroll>
    </div>
  );
};
