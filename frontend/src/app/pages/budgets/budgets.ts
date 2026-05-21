import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { BudgetApiService } from '../../services/api/budgets/budget-api.service';
import { Budget } from '../../models/budget.model';

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
    private budgetApiService: BudgetApiService,
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
    this.budgetApiService.getBudgets().subscribe((res) => this.budgets.set(res as any));
  }

  getCategories() {
    this.categoryApiService.getTransactionCategories().subscribe((res) => this.categories.set(res as any));
  }

  createBudget() {
    const budget: Budget = {
      name: this.form.get('name')?.value as string,
      category_id: this.form.get('category_id')?.value as string,
      amount: this.form.get('amount')?.value as number,
      start_date: this.form.get('start_date')?.value as Date,
      end_date: this.form.get('end_date')?.value as Date
    }

    this.budgetApiService.createBudget(budget).subscribe((res) => this.getBudgets());
  }
}
