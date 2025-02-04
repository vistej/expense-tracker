export interface Expense {
  id: number;
  item_name: string;
  category_id: number;
  cost: number;
  date: string;
  recurring: boolean;
  recurrence_period: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryMap {
  [key: number]: string;
}

export interface Filter {
  start_date: Date;
  end_date: Date;
  category_ids: string[];
}
