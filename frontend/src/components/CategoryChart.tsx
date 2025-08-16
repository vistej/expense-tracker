import { useEffect, useState } from "react";
import {
  CategoryCost,
  CategoryCostObject,
  DoughnutChartData,
} from "../models/dashboard.model";
import { Doughnut } from "react-chartjs-2";
import { useCategories } from "../context/categoryContext";
import { useTheme } from "../context/ThemeContext";
import { chartColors, getChartOptions } from "../ChartSetup";

type Props = {
  categoryCosts: CategoryCost[];
};

export const CategoryChart = ({ categoryCosts }: Props) => {
  const { categories } = useCategories();
  const { theme } = useTheme();
  const [costData, setCostData] = useState<CategoryCostObject>({});
  const [chartData, setChartData] = useState<DoughnutChartData | null>(null);

  // Enhanced chart options with theme support
  const baseOptions = getChartOptions(theme === 'dark');
  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins?.legend,
        position: 'bottom' as const,
        labels: {
          ...baseOptions.plugins?.legend?.labels,
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        ...baseOptions.plugins?.tooltip,
        callbacks: {
          label: function (context: { label?: string; parsed: number; dataset: { data: number[] } }) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      },
    },
  };

  // Force chart re-render when theme changes
  useEffect(() => {
    // This will trigger a re-render of the chart with new theme options
  }, [theme]);

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

      // Use the new chart colors
      const backgroundColors = [
        chartColors.chart1,
        chartColors.chart2,
        chartColors.chart3,
        chartColors.chart4,
        chartColors.chart5,
        chartColors.chart6,
        chartColors.chart7,
        chartColors.chart8,
        chartColors.primary,
        chartColors.secondary,
      ];

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data,
            backgroundColor: backgroundColors.slice(0, data.length),
            borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [costData, categories]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-center text-text-muted">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
