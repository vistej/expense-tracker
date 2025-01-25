import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ENDPOINTS } from "../constants";
import { CategoryCost, MonthCost } from "../models/dashboard.model";
import { CategoryChart } from "../components/CategoryChart";
import BarLineChart from "../components/BarLineChart";

interface IDashboardProps {}

export const Dashboard: FC<IDashboardProps> = (props) => {
  const [categoryCosts, setCategoryCosts] = useState<CategoryCost[]>([]);
  const [monthlyCosts, setMonthlyCosts] = useState<MonthCost[]>([]);

  useEffect(() => {
    fetchCategoryCosts();
    fetchMonthlyCosts();
  }, []);

  const fetchCategoryCosts = async () => {
    try {
      const res = await api.get(ENDPOINTS.CATEGORY_COSTS);
      if (res.status === 200) {
        setCategoryCosts(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyCosts = async () => {
    try {
      const res = await api.get(ENDPOINTS.MONTHLY_COSTS);
      if (res.status === 200) {
        setMonthlyCosts(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="h-screen overflow-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col p-4 w-full md:w-1/2">
            {monthlyCosts && <BarLineChart monthlyCosts={monthlyCosts} />}
          </div>
          <div className="flex flex-col p-4 w-full md:w-1/2">
            {categoryCosts && <CategoryChart categoryCosts={categoryCosts} />}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
