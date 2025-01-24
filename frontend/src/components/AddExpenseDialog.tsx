import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import api from "../apis";
import { Category } from "../models/expense.model";
import { ENDPOINTS } from "../constants";
import { useForm } from "react-hook-form";

export type ExpenseForm = {
  item_name: string;
  category_id: number;
  cost: number;
};

const AddExpenseDialog = ({
  categories,
  isOpen,
  closeModal,
}: {
  categories: Category[];
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseForm>();

  const onSubmit = async (data: ExpenseForm) => {
    setLoading(true);
    try {
      await api.post(ENDPOINTS.CREATE_EXPENSE, data);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black bg-opacity-50" />{" "}
      {/* Custom Overlay */}
      <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg w-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            Add Expense
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
                  reset();
                  closeModal();
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddExpenseDialog;
