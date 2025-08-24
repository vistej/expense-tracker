import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import api from "../apis";
import { Category, Expense } from "../models/expense.model";
import { ACTIONS, ENDPOINTS } from "../constants";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "../utils/date";
import DatePicker from "react-tailwindcss-datepicker";
import {
  XMarkIcon,
  ReceiptRefundIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export type ExpenseForm = {
  id?: number;
  item_name: string;
  category_id: number;
  cost: number;
  date: Date;
  description?: string;
  recurring?: boolean;
  recurrence_period?: string;
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
    watch,
    formState: { errors, isValid },
  } = useForm<ExpenseForm>({
    mode: "onChange",
    defaultValues: {
      item_name: "",
      category_id: -1,
      cost: 0,
      date: new Date(),
      description: "",
      recurring: false,
      recurrence_period: "",
    },
  });

  const isRecurring = watch("recurring");

  useEffect(() => {
    if (expense) {
      reset({
        ...expense,
        date: new Date(expense.date),
        description: expense.description || "",
        recurring: expense.recurring || false,
        recurrence_period: expense.recurrence_period || "",
      });
    } else {
      reset({
        item_name: "",
        category_id: -1,
        cost: 0,
        date: new Date(),
        description: "",
        recurring: false,
        recurrence_period: "",
      });
    }
  }, [isOpen, expense, reset]);

  const addExpense = async (data: ExpenseForm) => {
    const expenseData = {
      ...data,
      date: formatDate(data.date),
      recurrence_period: data.recurrence_period || null
    };
    try {
      const res = await api.post(ENDPOINTS.CREATE_EXPENSE, expenseData);
      reset({});
      closeModal(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (data: ExpenseForm) => {
    const expenseData = {
      ...data,
      date: formatDate(data.date),
      recurrence_period: data.recurrence_period || null
    };
    try {
      const res = await api.patch(
        ENDPOINTS.UPDATE_EXPENSE + expenseData.id + "/",
        expenseData
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

  const handleClose = () => {
    reset({});
    closeModal(null);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-background-card rounded-2xl shadow-large border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <ReceiptRefundIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-display font-semibold text-text">
                  {title === ACTIONS.EDIT ? "Edit" : "Add New"} Expense
                </Dialog.Title>
                <p className="text-sm text-text-muted">
                  {title === ACTIONS.EDIT ? "Update your expense details" : "Enter the details of your new expense"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-text-muted hover:text-text hover:bg-neutral-100 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Item Name */}
            <div>
              <label htmlFor="item_name" className="block text-sm font-medium text-text mb-2">
                <div className="flex items-center space-x-2">
                  <ReceiptRefundIcon className="w-4 h-4 text-primary-500" />
                  <span>Item Name</span>
                </div>
              </label>
              <input
                id="item_name"
                type="text"
                placeholder="e.g., Groceries, Gas, Restaurant"
                {...register("item_name", {
                  required: "Item name is required",
                  minLength: {
                    value: 2,
                    message: "Item name must be at least 2 characters",
                  },
                })}
                className={`input-field ${errors.item_name ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              />
              {errors.item_name && (
                <p className="mt-2 text-sm text-danger flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.item_name.message}</span>
                </p>
              )}
            </div>

            {/* Cost and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-text mb-2">
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="w-4 h-4 text-primary-500" />
                    <span>Cost</span>
                  </div>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
                    $
                  </span>
                  <input
                    id="cost"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("cost", {
                      required: "Cost is required",
                      valueAsNumber: true,
                      min: {
                        value: 0.01,
                        message: "Cost must be greater than 0",
                      },
                      validate: (value) =>
                        /^\d+(\.\d{1,2})?$/.test(value.toString()) || "Cost must have at most two decimal places",
                    })}
                    className={`input-field pl-8 ${errors.cost ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                </div>
                {errors.cost && (
                  <p className="mt-2 text-sm text-danger flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.cost.message}</span>
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-text mb-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-primary-500" />
                    <span>Date</span>
                  </div>
                </label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
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
                        inputClassName={`input-field ${fieldState.error ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                      />
                      {fieldState.error && (
                        <p className="mt-2 text-sm text-danger flex items-center space-x-1">
                          <span>⚠</span>
                          <span>{fieldState.error.message}</span>
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                <div className="flex items-center space-x-2">
                  <TagIcon className="w-4 h-4 text-primary-500" />
                  <span>Category</span>
                </div>
              </label>
              <select
                {...register("category_id", {
                  required: "Category is required",
                  valueAsNumber: true,
                  validate: (val) => val > -1 || "Please select a category",
                })}
                className={`input-field ${errors.category_id ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              >
                <option value={-1}>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-2 text-sm text-danger flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.category_id.message}</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="w-4 h-4 text-primary-500" />
                  <span>Description (Optional)</span>
                </div>
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Add any additional details about this expense..."
                {...register("description")}
                className="input-field resize-none"
              />
            </div>

            {/* Recurring Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recurring"
                  {...register("recurring")}
                  className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500 focus:ring-2"
                />
                <label htmlFor="recurring" className="flex items-center space-x-2 text-sm font-medium text-text">
                  <ClockIcon className="w-4 h-4 text-accent-500" />
                  <span>This is a recurring expense</span>
                </label>
              </div>

              {isRecurring && (
                <div className="ml-7">
                  <label htmlFor="recurrence_period" className="block text-sm font-medium text-text mb-2">
                    Recurrence Period
                  </label>
                  <select
                    {...register("recurrence_period")}
                    className="input-field"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-border">
              <button
                type="submit"
                disabled={loading || !isValid}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <ReceiptRefundIcon className="w-4 h-4" />
                    <span>{title === ACTIONS.EDIT ? "Update" : "Add"} Expense</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddExpenseDialog;
