import { FC, useEffect, useState } from "react";
import api from "../apis";
import { ENDPOINTS } from "../constants";
import { CategoryCost, MonthCost } from "../models/dashboard.model";
import { CategoryChart } from "../components/CategoryChart";
import BarLineChart from "../components/BarLineChart";
import Loading from "../components/Loading";


export const Dashboard: FC = () => {
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

  if (!categoryCosts || !monthlyCosts) {
    return <Loading />;
  }
  return (
    <>
      {categoryCosts.length ? (<div className="h-screen flex overflow-auto p-4">
        <div className="flex flex-col lg:px-20 w-full lg:flex-row md:space-x-4">
          <div className="flex flex-col p-4 w-full lg:w-1/2">
            {monthlyCosts && <BarLineChart monthlyCosts={monthlyCosts} />}
          </div>
          <div className="flex flex-col p-4 w-full lg:w-1/2">
            {categoryCosts && <CategoryChart categoryCosts={categoryCosts} />}
          </div>
        </div>
        <div></div>
      </div>) : <div className="h-screen flex justify-center items-center">
        Start adding expenses to see the dashboard.
      </div>}
    </>
  );
};
