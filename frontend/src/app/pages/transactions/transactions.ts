import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaymentsList } from "../../components/payments-list/payments-list";
import { TransactionsApiService } from '../../services/api/transactions/transactions-api.service';
import { Payment } from '../../models/payment.model';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { BudgetApiService } from '../../services/api/budgets/budget-api.service';

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

  constructor(
    private transactionApiService: TransactionsApiService,
    private categoryApiService: CategoriesApiService,
    private budgetApiService: BudgetApiService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
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
    this.transactionApiService.getTransactions().subscribe((res) => this.transactions.set(res as any));
  }

  createTransaction(form: FormGroup): void {
    const transaction: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.transactionApiService.createTransaction(transaction).subscribe(() => this.getTransactions());
  }

  getCategories() {
    this.categoryApiService.getTransactionCategories().subscribe((res) => this.categories.set(res as any));
  }
  
  getBudgets(category_id: string) {
    this.budgetApiService.getBudgetsByCategory(category_id).subscribe(
      (res) => {
        this.budgets.set(res as any);
      }
    );
  }

  getTransactionsByCategory() {
    const categoryId = this.catForm.get('category_id')?.value as string;
    this.transactionApiService.getTransactionsByCategory(categoryId).subscribe(
      (res) => {
        this.filteredTransactions.set(res as any);
        this.getBudgets(categoryId);
      }
    );
  }
}
