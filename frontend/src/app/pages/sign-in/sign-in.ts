import { Component } from '@angular/core';
import { Login } from './login/login';
import { Register } from './register/register';

type FormType = 'login' | 'register';

@Component({
  selector: 'app-sign-in',
  imports: [Login, Register],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  formType: FormType = 'login';

  setForm(formType: FormType): void {
    this.formType = formType;
  }
}
