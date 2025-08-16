import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ACTIONS, ENDPOINTS } from "../constants";
import { useCategories } from "../context/categoryContext";
import AddExpenseDialog, { ExpenseForm } from "../components/AddExpenseDialog";
import { CategoryMap, Expense, Filter } from "../models/expense.model";
import { ExpenseList } from "../components/ExpenseList";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExpensesFilter from "../components/ExpensesFilter";
import { formatDate, getPastDate } from "../utils/date";
import {
  ReceiptRefundIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export const Expenses: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { categories } = useCategories();
  const [categoryMap, setCategoryMap] = useState<CategoryMap>({});
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [action, setAction] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({
    start_date: getPastDate(new Date(), 365),
    end_date: new Date(),
    category_ids: []
  });

  useEffect(() => {
    const obj: CategoryMap = {};
    categories.forEach((cat) => {
      obj[cat.id] = cat.name;
    });
    setCategoryMap(obj);
  }, [categories]);

  const fetchExpenses = async (page: number) => {
    if (!page) return;
    try {
      const end_date = formatDate(filter.end_date);
      const start_date = formatDate(filter.start_date);
      const category_ids = filter.category_ids.join(',');

      const data = await api.get(ENDPOINTS.GET_EXPENSES(start_date, end_date, category_ids, page));
      if (data.status == 200) {
        const hasData = data.data.results.length;
        if (hasData) {
          const res = page === 1 ? [...data.data.results] : [...expenses, ...data.data.results];
          setExpenses(res);
        }
        setPage(!data.data.next || !hasData ? 0 : page + 1);
      }
    } catch (error) {
      console.log(error);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses(page);
  }, []);

  const updateExpenses = (expense: Expense | ExpenseForm, action: string) => {
    let new_data = [];
    if (action == ACTIONS.ADD) {
      new_data = [expense, ...expenses];
    } else {
      new_data = expenses.map((ex) => {
        if (ex.id === expense.id) {
          return expense;
        }
        return ex;
      });
    }
    setExpenses(new_data as Expense[]);
  };

  const handleDelete = async (val: boolean) => {
    if (val && selectedExpense) {
      try {
        const id = selectedExpense.id;
        const res = await api.delete(ENDPOINTS.DELETE_EXPENSE + id + "/");
        if (res.status === 204) {
          const new_data = expenses.filter((e) => e.id !== id);
          setExpenses(new_data);
          setSelectedExpense(null);
          setAction("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedExpense(null);
      setAction("");
    }
  };

  const onSearch = () => {
    setPage(1);
    fetchExpenses(1);
  };

  // Get current date for comparison
  const currentDate = new Date();



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-text mb-2">
                Expense Management
              </h1>
              <p className="text-text-muted text-lg">
                Track and manage your expenses with ease
              </p>
            </div>
            <button
              onClick={() => setAction(ACTIONS.ADD)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Expense</span>
            </button>
          </div>


        </div>

        {/* Filters Section */}
        <div className="card mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-display font-semibold text-text mb-2">
              Filter Expenses
            </h3>
            <p className="text-text-muted text-sm">
              Narrow down your expenses by date range and category
            </p>
          </div>
          <ExpensesFilter
            filter={filter}
            updateFilter={setFilter}
            onSearch={onSearch}
          />
        </div>

        {/* Expenses List */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-display font-semibold text-text mb-2">
              Expense List
            </h3>
            <p className="text-text-muted text-sm">
              {expenses.length > 0
                ? `Showing ${expenses.length} expense${expenses.length !== 1 ? 's' : ''}`
                : 'No expenses found for the selected filters'
              }
            </p>
          </div>

          {expenses && expenses.length > 0 ? (
            <ExpenseList
              expenses={expenses}
              categoryMap={categoryMap}
              setSelectedExpense={setSelectedExpense}
              setAction={setAction}
              loadMore={() => fetchExpenses(page)}
              hasMore={Boolean(page)}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ReceiptRefundIcon className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-lg font-display font-semibold text-text mb-2">
                No Expenses Found
              </h3>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                {filter.category_ids.length > 0 || filter.start_date !== getPastDate(currentDate, 365) || filter.end_date !== currentDate
                  ? "Try adjusting your filters or add a new expense to get started."
                  : "Start tracking your expenses by adding your first expense entry."
                }
              </p>
              <button
                onClick={() => setAction(ACTIONS.ADD)}
                className="btn-primary"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Your First Expense
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddExpenseDialog
        title={action}
        expense={selectedExpense}
        categories={categories}
        isOpen={action === ACTIONS.ADD || action === ACTIONS.EDIT}
        closeModal={(expense?: ExpenseForm | Expense | null) => {
          if (expense) {
            updateExpenses(expense, action);
          }
          setSelectedExpense(null);
          setAction("");
        }}
      />

      {action && (
        <ConfirmationDialog
          title="Delete Expense?"
          isOpen={action === ACTIONS.DELETE}
          closeDialog={handleDelete}
        />
      )}
    </div>
  );
};
