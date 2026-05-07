import { Routes } from '@angular/router';
import { Calendar } from './pages/calendar/calendar';
import { SignIn } from './pages/sign-in/sign-in';
import { loginRedirectGuard } from './guards/login-redirect-guard';

export const routes: Routes = [
  {
    path: 'cal',
    component: Calendar
  },
  {
    path: 'login',
    component: SignIn,
    canActivate: [loginRedirectGuard]
  }
];
