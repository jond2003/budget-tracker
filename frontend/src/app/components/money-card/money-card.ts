import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-money-card',
  imports: [CurrencyPipe],
  templateUrl: './money-card.html',
  styleUrl: './money-card.css',
})
export class MoneyCard {
  label = input.required<string>();
  value = input.required<number>()
}
