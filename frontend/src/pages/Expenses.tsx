import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ACTIONS, ENDPOINTS } from "../constants";
import { useCategories } from "../context/categoryContext";
import AddExpenseDialog from "../components/AddExpenseDialog";
import { Expense } from "../models/expense.model";
import { ExpenseList } from "../components/ExpenseList";
import FloatingButton from "../components/FloatingButton";
import ConfirmationDialog from "../components/ConfirmationDialog";
interface IExpensesProps {}

export const Expenses: FC<IExpensesProps> = (props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { categories } = useCategories();
  const [categoryMap, setCategoryMap] = useState<any>({});
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [action, setAction] = useState<string>("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const obj: any = {};
    categories.forEach((cat) => {
      obj[cat.id] = cat.name;
    });
    setCategoryMap(obj);
  }, [categories]);

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

  const updateExpenses = (expense: Expense, action: string) => {
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
    setExpenses(new_data);
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
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedExpense(null);
    }
  };

  const loadMore = () => {
    // TODO implement later
  };
  return (
    <>
      {expenses && (
        <ExpenseList
          expenses={expenses}
          categoryMap={categoryMap}
          setSelectedExpense={setSelectedExpense}
          setAction={setAction}
          loadMore={loadMore}
        />
      )}

      <AddExpenseDialog
        title={action}
        expense={selectedExpense}
        categories={categories}
        isOpen={action === ACTIONS.ADD || action === ACTIONS.EDIT}
        closeModal={(expense?: Expense | null) => {
          if (expense) {
            updateExpenses(expense, action);
          }
          setSelectedExpense(null);
          setAction("");
        }}
      />
      <ConfirmationDialog
        title="Delete Expense?"
        isOpen={action === ACTIONS.DELETE}
        closeDialog={handleDelete}
      />
      <div>
        <FloatingButton onclick={() => setAction(ACTIONS.ADD)} />
      </div>
    </>
  );
};
