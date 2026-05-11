import { Component, input } from '@angular/core';
import { PaymentsList } from '../payments-list/payments-list';

@Component({
  selector: 'app-receipt-modal',
  imports: [PaymentsList],
  templateUrl: './receipt-modal.html',
  styleUrl: './receipt-modal.css',
})
export class ReceiptModal {
  date = input.required<Date>();
  transactions = input.required<any[]>();
  incomes = input.required<any[]>();
}
