import { Component, computed, input, output } from '@angular/core';
import { PaymentsList } from '../payments-list/payments-list';
import { IncomeApiService } from '../../services/api/income/income-api.service';
import { TransactionsApiService } from '../../services/api/transactions/transactions-api.service';
import { Payment } from '../../models/payment.model';
import { FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-receipt-modal',
  imports: [PaymentsList, CurrencyPipe],
  templateUrl: './receipt-modal.html',
  styleUrl: './receipt-modal.css',
})
export class ReceiptModal {
  date = input.required<Date>();
  transactions = input.required<Payment[]>();
  incomes = input.required<Payment[]>();

  updateIncomes = output<void>();
  updateTransactions = output<void>();

  incomesAmount = computed(() => this.incomes().reduce((acc: number, c: any) => acc + c.amount, 0));
  transactionsAmount = computed(() => this.transactions().reduce((acc: number, c: any) => acc + c.amount, 0));

  constructor(
    private incomeApiService: IncomeApiService,
    private transactionApiService: TransactionsApiService
  ) { }

  deleteIncome(index: number): void {
    this.incomeApiService.deleteIncome(this.incomes()[index]).subscribe(() => {
      this.updateIncomes.emit();
    });
  }

  deleteTransaction(index: number): void {
    this.transactionApiService.deleteTransaction(this.transactions()[index]).subscribe(() => {
      this.updateTransactions.emit();
    });
  }

  createTransaction(form: FormGroup): void {
    const transaction: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.transactionApiService.createTransaction(transaction).subscribe(() => this.updateTransactions.emit());
  }

  createIncome(form: FormGroup): void {
    const income: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.incomeApiService.createIncome(income).subscribe(() => this.updateIncomes.emit());
  }
}
