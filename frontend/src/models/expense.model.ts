export interface Expense {
  id: number;
  item_name: string;
  category_id: number;
  cost: number;
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
