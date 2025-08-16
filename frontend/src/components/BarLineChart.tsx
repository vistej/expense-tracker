import { FunctionComponent, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { BarLineChartData, MonthCost } from "../models/dashboard.model";
import { useTheme } from "../context/ThemeContext";
import { chartColors, getChartOptions } from "../ChartSetup";

interface BarLineChartProps {
  monthlyCosts: MonthCost[];
}

const BarLineChart: FunctionComponent<BarLineChartProps> = ({ monthlyCosts }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<BarLineChartData | null>(null);

  // Enhanced chart options with theme support
  const baseOptions = getChartOptions(theme === 'dark');
  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins?.legend,
        position: 'top' as const,
        labels: {
          ...baseOptions.plugins?.legend?.labels,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        ...baseOptions.plugins?.tooltip,
        callbacks: {
          label: function (context: { dataset: { label?: string }; parsed: { y: number } }) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales?.y,
        beginAtZero: true,
        grid: {
          ...baseOptions.scales?.y?.grid,
          drawBorder: false,
        },
      },
      x: {
        ...baseOptions.scales?.x,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  // Force chart re-render when theme changes
  useEffect(() => {
    // This will trigger a re-render of the chart with new theme options
  }, [theme]);

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  useEffect(() => {
    if (!monthlyCosts || monthlyCosts.length === 0) return;

    const labels: string[] = [];
    const data = monthlyCosts.map((cost: MonthCost) => {
      labels.push(getMonthName(cost.month));
      return Number(cost.total_cost);
    });

    // Use the new chart colors
    const barColors = [
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
      chartColors.accent,
      chartColors.info,
    ];

    setChartData({
      labels,
      datasets: [
        {
          label: 'Trend Line',
          data,
          borderColor: chartColors.primary,
          backgroundColor: 'transparent',
          borderWidth: 3,
          type: 'line',
          tension: 0.4,
          pointBackgroundColor: chartColors.primary,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: false,
          order: 1,
        },
        {
          label: 'Monthly Expenses',
          data,
          backgroundColor: barColors.slice(0, data.length).map(color => `${color}80`), // Add transparency
          borderColor: barColors.slice(0, data.length),
          borderWidth: 2,
          type: 'bar',
          borderRadius: 6,
          order: 2,
        },
      ],
    });
  }, [monthlyCosts]);

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
      {/* @ts-expect-error - Chart.js type mismatch between Bar and mixed chart types */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarLineChart;