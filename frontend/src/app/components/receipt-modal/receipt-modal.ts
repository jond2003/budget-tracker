import { Component, input } from '@angular/core';
import { PaymentsList } from '../payments-list/payments-list';
import { IncomeApiService } from '../../services/api/income/income-api.service';
import { TransactionsApiService } from '../../services/api/transactions/transactions-api.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-receipt-modal',
  imports: [PaymentsList],
  templateUrl: './receipt-modal.html',
  styleUrl: './receipt-modal.css',
})
export class ReceiptModal {
  date = input.required<Date>();
  transactions = input.required<Payment[]>();
  incomes = input.required<Payment[]>();

  disableIncomeRow = -1
  disableTransactionRow = -1

  constructor(
    private incomeApiService: IncomeApiService,
    private transactionApiService: TransactionsApiService
  ) { }

  deleteIncome(index: number): void {
    this.disableIncomeRow = index;
    this.incomeApiService.deleteIncome(this.incomes()[index]).subscribe(() => {
      this.disableIncomeRow = -1;
    });
  }

  deleteTransaction(index: number): void {
    this.disableTransactionRow = index;
    this.transactionApiService.deleteTransaction(this.transactions()[index]).subscribe(() => {
      this.disableTransactionRow = -1;
    });
  }
}
