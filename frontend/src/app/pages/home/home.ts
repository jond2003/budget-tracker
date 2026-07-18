import { Component, signal } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { LoginService } from '../../services/login/login-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  user = signal<UserModel.UserDetails | undefined>(undefined);

  constructor(private loginService: LoginService) {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loginService.getUserDetails().subscribe(userDetails => {
      this.user.set(userDetails);
    });
  }
}
