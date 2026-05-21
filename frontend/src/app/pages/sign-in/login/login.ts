import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login-service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../constants/routes';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.loginService.login(this.form).subscribe(res => {
      if (res.ok) this.router.navigate(['/'+ AppRoutes.CALENDAR]);
      else console.log(res);
    });
  }
}
