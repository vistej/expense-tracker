import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ENDPOINTS } from "../constants";
import { useCategories } from "../context/categoryContext";
import AddExpenseDialog from "../components/AddExpenseDialog";
import { Expense } from "../models/expense.model";
import { ExpenseList } from "../components/ExpenseList";
import FloatingButton from "../components/FloatingButton";
interface IExpensesProps {}

export const Expenses: FC<IExpensesProps> = (props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useCategories();
  const [categoryMap, setCategoryMap] = useState<any>({});

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

  const loadMore = () => {
    // TODO implement later
  };
  return (
    <>
      {expenses && (
        <ExpenseList
          expenses={expenses}
          categoryMap={categoryMap}
          loadMore={loadMore}
        />
      )}

      <AddExpenseDialog
        categories={categories}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />
      <div>
        <FloatingButton onclick={() => setOpenModal(true)} />
      </div>
    </>
  );
};
