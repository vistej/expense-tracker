import { Dialog, Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import api from "../apis";
import { Category, Expense } from "../models/expense.model";
import { ACTIONS, ENDPOINTS } from "../constants";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "../utils/date";
import DatePicker from "react-tailwindcss-datepicker";

export type ExpenseForm = {
  id?: number;
  item_name: string;
  category_id: number;
  cost: number;
  date: Date;
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
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ExpenseForm>();
  useEffect(() => {
    if (expense) {
      reset({ ...expense, date: new Date(expense.date) });
    } else {
      reset({});
    }
  }, [isOpen, expense, reset]);

  const addExpense = async (data: ExpenseForm) => {
    const expense = { ...data, date: formatDate(data.date) }
    try {
      const res = await api.post(ENDPOINTS.CREATE_EXPENSE, expense);
      reset({});
      closeModal(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (data: ExpenseForm) => {
    const expense = { ...data, date: formatDate(data.date) }
    try {
      const res = await api.patch(
        ENDPOINTS.UPDATE_EXPENSE + expense.id + "/",
        expense
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
        <div className="bg-background-card p-6 rounded-lg w-xl shadow-lg">
          <Dialog.Title className="text-xl font-bold text-text mb-4">
            {title} Expense
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="item_name"
                className="block text-text-muted"
              >
                Item Name
              </label>
              <input
                id="item_name"
                type="text"
                {...register("item_name", {
                  required: "Item Name is required",
                })}
                className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.item_name && (
                <p className="text-red-500 text-sm">
                  {errors.item_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:space-x-2">

                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label
                    htmlFor="cost"
                    className="block text-text-muted"
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
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.cost && (
                    <p className="text-red-500 text-sm">{errors.cost.message}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="date" className="w-full block text-text-muted">
                    Date
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={new Date()}
                    rules={{ required: "Date is required." }}
                    render={({ field, fieldState }) => (
                      <>
                        <DatePicker
                          {...field}
                          asSingle={true}
                          useRange={false}
                          readOnly={true}
                          maxDate={new Date()}
                          value={{ startDate: field.value, endDate: field.value }}
                          onChange={(date) => field.onChange(date?.startDate)}
                          inputClassName="w-full p-2 h-10.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {fieldState.error && <p className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </p>}
                      </>
                    )}
                  >

                  </Controller>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-text-muted"
              >
                Category
              </label>
              <Select
                {...register("category_id", {
                  required: "Category is required",
                  valueAsNumber: true,
                  validate: (val) => val > -1 || "Category is required",
                })}
                className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[{ id: -1, name: "Please select" }, ...categories].map(
                  (category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </Select>
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
                className="px-4 py-2 bg-text-muted text-white rounded-md hover:bg-text-muted/80 transition-all ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-all ease-in-out"
                disabled={loading || !isDirty}
              >
                {/* TODO button is disabled by isDirty. change it and show errors */}
                {loading ? 'Saving' : title} Expense
              </button>
            </div>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddExpenseDialog;
