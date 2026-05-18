import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PaymentsList } from "../../components/payments-list/payments-list";
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';

@Component({
  selector: 'app-income',
  imports: [ReactiveFormsModule, DatePipe, PaymentsList],
  templateUrl: './income.html',
  styleUrl: './income.css',
})
export class Income {
  form: FormGroup;
  incomes = signal([] as any);
  categories = signal([] as any);

  constructor(
    private categoryApiService: CategoriesApiService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category_id: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [new Date(), [Validators.required]],
    });
    this.getIncomes();
    this.getCategories();
  }

  getCategories() {
    this.categoryApiService.getIncomeCategories().subscribe((res) => this.categories.set(res as any));
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
    const category_id = this.form.get('category_id')?.value as string;
    const amount = this.form.get('amount')?.value as number;
    const payment_date = this.form.get('payment_date')?.value as number;
    const details = {
      label,
      category_id,
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
