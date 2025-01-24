import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import api from "../apis";
import { Category, Expense } from "../models/expense.model";
import { ACTIONS, ENDPOINTS } from "../constants";
import { useForm } from "react-hook-form";

export type ExpenseForm = {
  id?: number;
  item_name: string;
  category_id: number;
  cost: number;
};

const AddExpenseDialog = ({
  title,
  categories,
  isOpen,
  expense,
  closeModal,
}: {
  title: string;
  categories: Category[];
  isOpen: boolean;
  expense?: Expense | null;
  closeModal: (expense: Expense) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ExpenseForm>();
  useEffect(() => {
    console.log(expense);
    if (expense) {
      reset(expense);
    } else {
      reset({});
    }
  }, [isOpen]);

  const addExpense = async (data: ExpenseForm) => {
    try {
      const res = await api.post(ENDPOINTS.CREATE_EXPENSE, data);
      console.log(res);
      reset({});
      closeModal(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (data: ExpenseForm) => {
    try {
      const res = await api.patch(
        ENDPOINTS.UPDATE_EXPENSE + data.id + "/",
        data
      );
      if (res) {
        reset({});
        closeModal(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: ExpenseForm) => {
    setLoading(true);
    if (title === ACTIONS.EDIT) {
      updateExpense(data);
    } else {
      addExpense(data);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black bg-opacity-50" />{" "}
      {/* Custom Overlay */}
      <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg w-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            {title} Expense
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="item_name" className="block">
                Item Name
              </label>
              <input
                id="item_name"
                type="text"
                {...register("item_name", {
                  required: "Item Name is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.item_name && (
                <p className="text-red-500 text-sm">
                  {errors.item_name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="cost" className="block">
                Cost
              </label>
              <input
                id="cost"
                type="number"
                {...register("cost", {
                  required: "Cost is required",
                  valueAsNumber: true,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.cost && (
                <p className="text-red-500 text-sm">{errors.cost.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block">
                Category
              </label>
              <select
                {...register("category_id", {
                  required: "Category is required",
                  valueAsNumber: true,
                  validate: (val) => val > -1 || "Category is required",
                })}
                className="w-full p-2 border rounded"
              >
                {[{ id: -1, name: "Please select" }, ...categories].map(
                  (category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  reset({});
                  closeModal(null);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading || !isDirty}
              >
                {title} Expense
              </button>
            </div>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddExpenseDialog;
