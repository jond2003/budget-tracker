export  namespace API {
  const BASE_URL = 'http://localhost:3000/api/';
  
  const AUTH_BASE_URL = BASE_URL + 'auth/';
  export const AUTH_USER = AUTH_BASE_URL + 'me/';

  const USER_BASE_URL = BASE_URL + 'users/';
  export const LOGIN = USER_BASE_URL + 'login/';
  export const LOGOUT = USER_BASE_URL + 'logout/';
  export const REGISTER = USER_BASE_URL + 'register/';

  export const TRANSACTIONS_BASE_URL = BASE_URL + 'transactions/';
  export const CATEGORY_TRANSACTIONS = TRANSACTIONS_BASE_URL + 'category/';
  export const MONTH_TRANSACTIONS = TRANSACTIONS_BASE_URL + 'month/';
  export const MONTH_CATEGORY_TRANSACTIONS = (date: string, category_id: string) => {
    return MONTH_TRANSACTIONS + date + '/category/' + category_id;
  };

  export const INCOMES_BASE_URL = BASE_URL + 'incomes/';
  export const CATEGORY_INCOMES = INCOMES_BASE_URL + 'category/';
  export const MONTH_INCOMES = INCOMES_BASE_URL + 'month/';
  export const MONTH_CATEGORY_INCOMES = (date: string, category_id: string) => {
    return MONTH_INCOMES + date + '/category/' + category_id;
  };

  export const CATEGORIES_BASE_URL = BASE_URL + 'categories/';
  export const INCOME_CATEGORIES = CATEGORIES_BASE_URL + 'income/';
  export const TRANSACTIONS_CATEGORIES = CATEGORIES_BASE_URL + 'transaction/';

  export const BUDGETS_BASE_URL = BASE_URL + 'budget/';
  export const ALL_BUDGETS = BUDGETS_BASE_URL + 'all/';
  export const MONTH_BUDGET = BUDGETS_BASE_URL + 'month/';
  export const CATEGORY_BUDGETS = BUDGETS_BASE_URL + 'category/';
  export const MONTH_CATEGORY_BUDGET = (date: string, category_id: string) => {
    return MONTH_BUDGET + date + '/category/' + category_id;
  };
  export const NET_WORTH = BUDGETS_BASE_URL + 'networth/';
}
