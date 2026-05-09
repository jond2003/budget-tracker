import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  form: FormGroup;
  transactions = signal([] as any);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [new Date(), [Validators.required]],
    });
    this.getTransactions();
  }

  getTransactions() {
    this.http.get(API.TRANSACTIONS_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.transactions.set(res as any);
        console.log(this.transactions());
      }
    );
  }

  addTransaction() {
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

    this.http.post(API.TRANSACTIONS_BASE_URL, details, { responseType: 'text', withCredentials: true }).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
