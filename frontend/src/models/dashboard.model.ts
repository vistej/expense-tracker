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

export interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string[] | string;
    hoverBackgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
    type?: string;
  }[];
}

export interface CurrentCost {
  month: number;
  year: number;
}
