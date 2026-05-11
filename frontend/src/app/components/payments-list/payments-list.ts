import { booleanAttribute, Component, input } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments-list',
  imports: [DatePipe],
  templateUrl: './payments-list.html',
  styleUrl: './payments-list.css',
})
export class PaymentsList {
  payments = input.required<Payment[]>();
  showDate = input(false, {
    transform: booleanAttribute
  });
}
