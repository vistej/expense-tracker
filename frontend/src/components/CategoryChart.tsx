import { useEffect, useState } from "react";
import {
  ChartData,
  CategoryCost,
  CategoryCostObject,
} from "../models/dashboard.model";
import { Doughnut, Pie } from "react-chartjs-2";
import { useCategories } from "../context/categoryContext";

type Props = {
  categoryCosts: CategoryCost[];
};
export const CategoryChart = ({ categoryCosts }: Props) => {
  const { categories } = useCategories();
  const [costData, setCostData] = useState<CategoryCostObject>({});
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const costObj = {} as CategoryCostObject;
    categoryCosts.forEach((cost) => {
      if (!costObj[cost.category_id]) {
        costObj[cost.category_id] = [];
      }
      costObj[cost.category_id].push(cost);
    });
    setCostData(costObj);
  }, [categoryCosts]);

  useEffect(() => {
    if (costData) {
      const labels: string[] = [];
      const data: number[] = [];
      Object.keys(costData).forEach((key) => {
        const category = categories.find((cat) => cat.id === parseInt(key));
        if (category) {
          labels.push(category.name);
          const totalCost = costData[key].reduce(
            (acc, curr) => acc + Number(curr.total_cost),
            0
          );

          data.push(totalCost);
        }
      });
      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data,
            backgroundColor: [
              "#D1C6B1",
              "#9E9E9E",
              "#B3C8B3",
              "#D4A5A5",
              "#A1B2C1",
              "#F0D0A1",
              "#D9E2E1",
              "#C2D8D2",
              "#E6D9C6",
              "#C3B4B8",
            ],
            borderColor: "#FFFFFF", // Optional: for a clean, white border around each segment
            borderWidth: 1,
          },
        ],
      });
    }
  }, [costData, categories]);
  return (
    <div>
      {chartData && (
        <div className="w-full  mx-auto h-96">
          <h2 className="text-center mb-4">Category Wise Expenses</h2>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};
