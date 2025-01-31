import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
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
  closeModal: (expense: Expense | ExpenseForm | null) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ExpenseForm>();
  useEffect(() => {
    if (expense) {
      reset(expense);
    } else {
      reset({});
    }
  }, [isOpen, expense, reset]);

  const addExpense = async (data: ExpenseForm) => {
    try {
      const res = await api.post(ENDPOINTS.CREATE_EXPENSE, data);
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
    <Dialog open={isOpen} onClose={() => closeModal(null)}>
      <div className="fixed inset-0 bg-gradient-to-b from-black to-transparent bg-opacity-50" />{" "}
      {/* Custom Overlay */}
      <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-[var(--color-card-background)] p-6 rounded-lg w-xl shadow-lg">
          <Dialog.Title className="text-xl font-bold text-[var(--color-text)] mb-4">
            {title} Expense
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="item_name"
                className="block text-[var(--color-muted-text)]"
              >
                Item Name
              </label>
              <input
                id="item_name"
                type="text"
                {...register("item_name", {
                  required: "Item Name is required",
                })}
                className="w-full p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              {errors.item_name && (
                <p className="text-red-500 text-sm">
                  {errors.item_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="cost"
                className="block text-[var(--color-muted-text)]"
              >
                Cost
              </label>
              <input
                id="cost"
                type="number"
                step="0.01"
                {...register("cost", {
                  required: "Cost is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    /^\d+(\.\d{1,2})?$/.test(value.toString()) || "Cost must have at most two decimal places",

                  min: {
                    value: 0,
                    message: "Cost must be greater than or equal to 0",
                  },

                })}
                className="w-full p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              {errors.cost && (
                <p className="text-red-500 text-sm">{errors.cost.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-[var(--color-muted-text)]"
              >
                Category
              </label>
              <select
                {...register("category_id", {
                  required: "Category is required",
                  valueAsNumber: true,
                  validate: (val) => val > -1 || "Category is required",
                })}
                className="w-full p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
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
                className="px-4 py-2 bg-[var(--color-muted-text)] text-white rounded-md hover:bg-[var(--color-muted-text)]/80 transition-all ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-all ease-in-out"
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
