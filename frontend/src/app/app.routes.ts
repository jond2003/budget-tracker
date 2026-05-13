import { Routes } from '@angular/router';
import { Calendar } from './pages/calendar/calendar';
import { SignIn } from './pages/sign-in/sign-in';
import { loginRedirectGuard } from './guards/login-redirect-guard';
import { AppRoutes } from './constants/routes';
import { Transactions } from './pages/transactions/transactions';
import { Income } from './pages/income/income';
import { Categories } from './pages/categories/categories';

export const routes: Routes = [
  {
    path: AppRoutes.CALENDAR,
    component: Calendar
  },
  {
    path: AppRoutes.LOGIN,
    component: SignIn,
    canActivate: [loginRedirectGuard]
  },
  {
    path: AppRoutes.TRANSACTIONS,
    component: Transactions
  },
  {
    path: AppRoutes.INCOME,
    component: Income
  },
  {
    path: AppRoutes.CATEGORIES,
    component: Categories
  }
];
