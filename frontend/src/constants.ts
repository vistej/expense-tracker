export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const MESSAGES = {
  loading: 'Loading...',
};

export const ENDPOINTS = {
  LOGIN: '/token/',
  REGISTER: '/user/register/',
  REFRESH: '/token/refresh/',
  PROFILE: '/user/profile/',
  GET_CATEGORIES: '/categories/',
  GET_EXPENSES: '/expenses/',
  CREATE_EXPENSE: '/expenses/',
  DELETE_EXPENSE: '/expenses/delete/',
  UPDATE_EXPENSE: '/expenses/update/',
  CATEGORY_COSTS: '/expenses/aggregations/category/',
  MONTHLY_COSTS: '/expenses/aggregations/monthly/',
};

export const ROUTES = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  DASHBOARD: '/',
  EXPENSES: '/expenses',
  PROFILE: '/profile',
};

export const ACTIONS = {
  ADD: 'Add',
  EDIT: 'Update',
  DELETE: 'Delete',
};
