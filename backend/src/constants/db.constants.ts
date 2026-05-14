import config from "../config/config";

// API
export const DB_URI = `mongodb+srv://${config.db_username}:${config.db_password}@expensescluster.zxdkfqv.mongodb.net/?appName=ExpensesCluster`;

// Databases
export namespace Databases {
  export const ADMIN = 'admin';
  export const EXPENSES_DATA = 'ExpensesData';
}

// Collections
export namespace Collections {
  export const USERS = 'users';
  export const TRANSACTIONS = 'transactions';
  export const INCOME = 'income';
  export const RECURRING = 'recurring';
  export const CATEGORIES = 'categories';
  export const BUDGETS = 'budgets';
}