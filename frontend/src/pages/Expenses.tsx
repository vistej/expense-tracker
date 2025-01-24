import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ENDPOINTS } from "../constants";
interface IExpensesProps {}

export const Expenses: FC<IExpensesProps> = (props) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await api.get(ENDPOINTS.GET_EXPENSES);
      if (data.status == 200) {
        setExpenses(data.data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {expenses && (
        <div className="max-h-screen overflow-auto bg-gray-100 p-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-4"
            >
              {/* Left Section: Item Name, Category, Price */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                <p className="font-semibold text-gray-800">
                  {expense.item_name}
                </p>
                <p className="text-gray-600 text-sm">
                  Category: {expense.category_id}
                </p>
                <p className="text-gray-600 text-sm">Price: ${expense.cost}</p>
              </div>

              {/* Right Section: Edit and Delete Buttons */}
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
