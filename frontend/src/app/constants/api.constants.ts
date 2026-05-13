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
    return MONTH_TRANSACTIONS + date + '/' + CATEGORY_TRANSACTIONS + category_id;
  };

  export const INCOMES_BASE_URL = BASE_URL + 'incomes/';

  export const CATEGORIES_BASE_URL = BASE_URL + 'categories/';
}
