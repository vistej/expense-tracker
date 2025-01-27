import { FunctionComponent, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
          label: 'Trend',
          data,
          borderColor: '#6A8D92',  // Example line color
          backgroundColor: 'transparent',
          borderWidth: 2,
          type: 'line',
        },
        {
          label: 'Monthly Expenses',
          data,
          backgroundColor: [
            '#B8D8D8', '#A3C1AD', '#D1E0E0', '#F3D1C1', '#C1B2A3', '#D7C6D7',
            '#C8E6C9', '#E0C8A0', '#A9B0B3', '#E8D8D1', '#C6C6FF', '#F4E1D2'
          ],
          borderColor: '#FFFFFF',
          borderWidth: 1,
          type: 'bar',
        },
      ],
    });
  }, [monthlyCosts]);
  return (
    <div>
      {chartData &&
        (<div className="w-full  mx-auto h-96">
          <h2 className="text-center mb-4">Monthly Expenses</h2>
          <Bar data={chartData as any} options={options} />
        </div>)}

    </div>
  );
}

export default BarLineChart;