import { Component, signal, Signal } from '@angular/core';
import { AppRoutes } from '../../constants/routes';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login-service';
import { toSignal } from '@angular/core/rxjs-interop';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  navLinks: NavItem[] = [
    { label: 'Home', route: AppRoutes.HOME },
    { label: 'Transactions', route: AppRoutes.TRANSACTIONS },
    { label: 'Income', route: AppRoutes.INCOME },
    { label: 'Categories', route: AppRoutes.CATEGORIES },
    { label: 'Budgets', route: AppRoutes.BUDGETS },
    { label: 'Calendar', route: AppRoutes.CALENDAR }
  ];

  loginRoute = AppRoutes.LOGIN;
  loggedIn: Signal<boolean | undefined>;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loggedIn = toSignal(this.loginService.loggedIn$);
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/' + AppRoutes.LOGIN]);
    });
  }
}
