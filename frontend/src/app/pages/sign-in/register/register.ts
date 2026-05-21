import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login-service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../constants/routes';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatch }
    );
  }

  get firstname() { return this.form.get('firstname')!; }
  get lastname() { return this.form.get('lastname')!; }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  onSubmit() {
    this.loginService.register(this.form).subscribe(res => {
      if (res.ok) {
        this.loginService.login(this.form).subscribe((res) => {
          if (res.ok) this.router.navigate(['/'+ AppRoutes.CALENDAR]);
          else console.log(res);
        });
      }
      else console.log(res);
    });
  }
}
