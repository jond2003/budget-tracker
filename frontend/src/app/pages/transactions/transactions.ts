import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaymentsList } from "../../components/payments-list/payments-list";

@Component({
  selector: 'app-transactions',
  imports: [ReactiveFormsModule, DatePipe, PaymentsList],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  form: FormGroup;
  catForm: FormGroup;
  transactions = signal([] as any);
  filteredTransactions = signal([] as any);
  categories = signal([] as any);
  budgets = signal([] as any);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [new Date(), [Validators.required]],
    });
    this.catForm = this.fb.group({
      category_id: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.getTransactions();
    this.getCategories();
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
    const category_id = this.form.get('category')?.value as string;
    const amount = this.form.get('amount')?.value as number;
    const payment_date = this.form.get('payment_date')?.value as number;
    const details = {
      label,
      category_id,
      amount,
      payment_date
    }

    this.http.post(API.TRANSACTIONS_BASE_URL, details, { responseType: 'text', withCredentials: true }).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  getCategories() {
    this.http.get(API.CATEGORIES_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.categories.set(res as any);
        console.log(res);
      }
    );
  }
  
  getBudgets(category_id: string) {
    this.http.get(API.CATEGORY_BUDGETS + category_id, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.budgets.set(res as any);
        console.log(res);
      }
    );
  }

  getTransactionsByCategory() {
    const categoryId = this.catForm.get('category_id')?.value as string;
    this.http.get(API.CATEGORY_TRANSACTIONS + categoryId, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.filteredTransactions.set(res as any);
        console.log(this.filteredTransactions());
        this.getBudgets(categoryId);
      }
    );
  }
}
