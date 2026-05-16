import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API } from '../../constants/api.constants';
import { DatePipe } from '@angular/common';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';

@Component({
  selector: 'app-budgets',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './budgets.html',
  styleUrl: './budgets.css',
})
export class Budgets {
  categories = signal([] as any);
  budgets = signal([] as any);
  form: FormGroup;

  constructor(
    private categoryApiService: CategoriesApiService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      category_id: [],
      start_date: [new Date(), [Validators.required]],
      end_date: [],
    });
    this.getBudgets();
    this.getCategories();
  }
  
  getBudgets() {
    this.http.get(API.BUDGETS_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.budgets.set(res as any);
        console.log(res);
      }
    );
  }

  getCategories() {
    this.categoryApiService.getTransactionCategories().subscribe((res) => this.categories.set(res as any));
  }

  createBudget() {
    const name = this.form.get('name')?.value as string;
    const category_id = this.form.get('category_id')?.value as string;
    const amount = this.form.get('amount')?.value as number;
    const start_date = this.form.get('start_date')?.value as number;
    const end_date = this.form.get('end_date')?.value as number;
    const details = {
      name,
      category_id,
      amount,
      start_date,
      end_date
    }

    this.http.post(API.BUDGETS_BASE_URL, details, { responseType: 'text', withCredentials: true }).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
