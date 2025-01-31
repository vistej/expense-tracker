import { ChartData, ChartDataset } from 'chart.js';

export interface CategoryCost {
  category_id: number;
  month: string;
  total_cost: number;
}

export interface MonthCost {
  month: string;
  name?: string;
  total_cost: number;
}

export interface CategoryCostObject {
  [category_id: string]: MonthCost[];
}

export interface DoughnutChartData extends ChartData<'doughnut'> {
  type?: 'doughnut';
}

// Define a dataset that can be either 'bar' or 'line'
type BarDataset = ChartDataset<'bar'> & { type: 'bar' };
type LineDataset = ChartDataset<'line'> & { type: 'line' };

// Allow datasets to be either 'bar' or 'line'
export interface BarLineChartData extends ChartData<'bar' | 'line'> {
  datasets: (BarDataset | LineDataset)[];
}

export interface CurrentCost {
  month: number;
  year: number;
}
