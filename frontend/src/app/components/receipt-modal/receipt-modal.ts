import { Component, input } from '@angular/core';

@Component({
  selector: 'app-receipt-modal',
  imports: [],
  templateUrl: './receipt-modal.html',
  styleUrl: './receipt-modal.css',
})
export class ReceiptModal {
  date = input.required<Date>();
}
