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
