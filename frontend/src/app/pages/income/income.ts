import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentsList } from "../../components/payments-list/payments-list";
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { IncomeApiService } from '../../services/api/income/income-api.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-income',
  imports: [ReactiveFormsModule, PaymentsList],
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
    private incomeApiService: IncomeApiService
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
    this.incomeApiService.getIncomes().subscribe(
      (res) => {
        this.incomes.set(res as any);
        console.log(this.incomes());
      }
    );
  }
  
  createIncome(form: FormGroup): void {
    const income: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.incomeApiService.createIncome(income).subscribe(() => this.getIncomes());
  }
}
