import { booleanAttribute, Component, computed, input, output, signal } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-payments-list',
  imports: [DatePipe, CurrencyPipe, NgClass],
  templateUrl: './payments-list.html',
  styleUrl: './payments-list.css',
})
export class PaymentsList {
  payments = input.required<Payment[]>();
  showDate = input(false, {
    transform: booleanAttribute
  });
  disableRow = input<number>(-1);

  totalAmount = computed(() => this.payments().reduce((acc: number, c: any) => acc + c.amount, 0));

  onDeleteRow = output<number>();
  
  categories = signal<Category[]>([]);

  constructor(private categoryApiService: CategoriesApiService) {
    this.getCategories();
  }
  
  getCategories() {
    this.categoryApiService.getCategories().subscribe(
      (res) => {
        this.categories.set(res as any);
      }
    );
  }
  
  deleteRow(index: number) {
    console.log("Deleting row", index);
    this.onDeleteRow.emit(index);
  }
}
