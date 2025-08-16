import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  LineController,
  ChartOptions,
} from 'chart.js';

// Register all needed components here
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  LineController
);

// Custom chart colors that match our design system
export const chartColors = {
  primary: '#3b82f6',
  secondary: '#22c55e',
  accent: '#f59e0b',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
  neutral: '#6b7280',
  // Chart-specific colors
  chart1: '#3b82f6', // Blue
  chart2: '#10b981', // Green
  chart3: '#f59e0b', // Amber
  chart4: '#ef4444', // Red
  chart5: '#8b5cf6', // Purple
  chart6: '#06b6d4', // Cyan
  chart7: '#f97316', // Orange
  chart8: '#ec4899', // Pink
};

// Theme-aware chart options
export const getChartOptions = (
  isDarkMode = false
): ChartOptions<'doughnut' | 'bar'> => {
  const textColor = isDarkMode ? '#e2e8f0' : '#1f2937';
  const mutedTextColor = isDarkMode ? '#94a3b8' : '#6b7280';
  const gridColor = isDarkMode ? '#334155' : '#e5e7eb';
  const tooltipBg = isDarkMode
    ? 'rgba(15, 23, 42, 0.95)'
    : 'rgba(31, 41, 55, 0.95)';
  const tooltipBorder = isDarkMode ? '#475569' : '#e5e7eb';

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
          color: textColor,
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: tooltipBorder,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: 'Poppins, system-ui, sans-serif',
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 13,
        },
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
          color: mutedTextColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
          color: mutedTextColor,
          callback: function (value: number) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        backgroundColor: chartColors.primary,
        borderColor: isDarkMode ? '#1e293b' : '#ffffff',
        borderWidth: 2,
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
      bar: {
        borderRadius: 4,
      },
    },
  } as ChartOptions<'doughnut' | 'bar'>;
};

// Legacy chart options for backward compatibility
export const chartOptions = getChartOptions(false);
