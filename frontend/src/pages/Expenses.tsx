import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ACTIONS, ENDPOINTS } from "../constants";
import { useCategories } from "../context/categoryContext";
import AddExpenseDialog, { ExpenseForm } from "../components/AddExpenseDialog";
import { CategoryMap, Expense, Filter } from "../models/expense.model";
import { ExpenseList } from "../components/ExpenseList";
import FloatingButton from "../components/FloatingButton";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExpensesFilter from "../components/ExpensesFilter";
import { formatDate, getPastDate } from "../utils/date";

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
  })


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
      const end_date = formatDate(filter.end_date)
      const start_date = formatDate(filter.start_date)
      const category_ids = filter.category_ids.join(',')

      const data = await api.get(ENDPOINTS.GET_EXPENSES(start_date, end_date, category_ids, page));
      if (data.status == 200) {
        const hasData = data.data.results.length;
        if (hasData) {
          const res = page === 1 ? [...data.data.results] : [...expenses, ...data.data.results]
          setExpenses(res);
        }
        setPage(!data.data.next || !hasData ? 0 : page + 1);
      }
    } catch (error) {
      console.log(error);
      setExpenses([])
    }
  }

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
    setPage(1)
    fetchExpenses(1)
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <ExpensesFilter filter={filter} updateFilter={setFilter} onSearch={onSearch} />
        {expenses && (
          <>
            <ExpenseList
              expenses={expenses}
              categoryMap={categoryMap}
              setSelectedExpense={setSelectedExpense}
              setAction={setAction}
              loadMore={() => fetchExpenses(page)}
              hasMore={Boolean(page)}
            />
          </>
        )}

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
      </div>
      {action && (
        <ConfirmationDialog
          title="Delete Expense?"
          isOpen={action === ACTIONS.DELETE}
          closeDialog={handleDelete}
        />
      )}
      <div>
        <FloatingButton onclick={() => setAction(ACTIONS.ADD)} />
      </div>
    </>
  );
};
