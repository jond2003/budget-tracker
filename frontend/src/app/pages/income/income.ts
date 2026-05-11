import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PaymentsList } from "../../components/payments-list/payments-list";

@Component({
  selector: 'app-income',
  imports: [ReactiveFormsModule, DatePipe, PaymentsList],
  templateUrl: './income.html',
  styleUrl: './income.css',
})
export class Income {
  form: FormGroup;
  incomes = signal([] as any);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [new Date(), [Validators.required]],
    });
    this.getIncomes();
  }

  getIncomes() {
    this.http.get(API.INCOMES_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.incomes.set(res as any);
        console.log(this.incomes());
      }
    );
  }

  addIncome() {
    const label = this.form.get('label')?.value as string;
    const category = this.form.get('category')?.value as string;
    const amount = this.form.get('amount')?.value as number;
    const payment_date = this.form.get('payment_date')?.value as number;
    const details = {
      label,
      category,
      amount,
      payment_date
    }

    this.http.post(API.INCOMES_BASE_URL, details, { responseType: 'text', withCredentials: true }).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
