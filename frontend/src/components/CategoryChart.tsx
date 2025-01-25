import { useEffect, useState } from "react";
import { ChartData, CategoryCost, CategoryCostObject } from "../models/dashboard.model";
import { Doughnut } from 'react-chartjs-2';
import { useCategories } from "../context/categoryContext";


type Props = {
  categoryCosts: CategoryCost[];
}
export const CategoryChart = ({ categoryCosts }: Props) => {
  const { categories } = useCategories();
  const [costData, setCostData] = useState<CategoryCostObject>({});
  const [chartData, setChartData] = useState<ChartData | null>(null);

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
          const totalCost = costData[key].reduce((acc, curr) => acc + Number(curr.total_cost), 0);

          data.push(totalCost);
        }
      });
      setChartData({
        labels,
        datasets: [
          {
            label: 'Expenses',
            data,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
              '#FF5733', '#C70039', '#900C3F', '#581845', '#2E4053',
            ],
            hoverBackgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
              '#FF5733', '#C70039', '#900C3F', '#581845', '#2E4053',
            ],

          },
        ],
      });
    }

  }, [costData, categories]);
  return (
    <div>
      {chartData &&
        (<div className="w-full max-w-xs mx-auto">
          <h2 className="text-center mb-4">Category Wise Expenses</h2>
          <Doughnut data={chartData} />
        </div>)}

    </div>
  );
}