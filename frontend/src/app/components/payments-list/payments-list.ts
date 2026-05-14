import { booleanAttribute, Component, computed, input, signal } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api.constants';

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
  totalAmount = computed(() => this.payments().reduce((acc: number, c: any) => acc + c.amount, 0));
  
  categories = signal([] as any);

  constructor(private http: HttpClient) {
    this.getCategories();
  }
  
  getCategories() {
    this.http.get(API.CATEGORIES_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.categories.set(res as any);
      }
    );
  }
}
