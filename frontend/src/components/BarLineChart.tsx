import { FunctionComponent, useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { ChartData, MonthCost } from "../models/dashboard.model";

interface BarLineChartProps {
  monthlyCosts: MonthCost[];
}

const BarLineChart: FunctionComponent<BarLineChartProps> = ({ monthlyCosts }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };
  useEffect(() => {
    const labels: string[] = [];
    const data = monthlyCosts.map((cost: MonthCost) => {
      labels.push(getMonthName(cost.month));
      return Number(cost.total_cost)
    });
    setChartData({
      labels,
      datasets: [
        {
          label: 'Monthly Expenses',
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
  }, [monthlyCosts]);
  return (
    <div>
      {chartData &&
        (<div className="w-full  mx-auto h-96">
          <h2 className="text-center mb-4">Monthly Expenses</h2>
          <Bar data={chartData} options={options} />
        </div>)}

    </div>
  );
}

export default BarLineChart;