import { booleanAttribute, Component, computed, input, OnInit, output, signal } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar/calendar';

@Component({
  selector: 'app-payments-list',
  imports: [DatePipe, CurrencyPipe, NgClass, ReactiveFormsModule],
  templateUrl: './payments-list.html',
  styleUrl: './payments-list.css',
})
export class PaymentsList implements OnInit {
  payments = input.required<Payment[]>();
  showDate = input(false, {
    transform: booleanAttribute
  });
  disableRow = signal<number>(-1);
  showCreateForm = signal(false);

  totalAmount = computed(() => this.payments().reduce((acc: number, c: any) => acc + c.amount, 0));
  resetDisableRow = computed(() => {
    const arr = this.payments();
    this.disableRow.set(-1);
    console.log(this.disableRow());
  });

  onDeleteRow = output<number>();
  onCreatePayment = output<FormGroup>();
  
  categories = signal<Category[]>([]);

  form: FormGroup;

  constructor(private categoryApiService: CategoriesApiService, private calendarService: CalendarService, private fb: FormBuilder) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category_id: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [this.calendarService.getDate(), [Validators.required]],
    });
    this.getCategories();
  }

  ngOnInit(): void {
    this.calendarService.date$.subscribe(date => {
      this.form.setValue({
        label: '',
        category_id: '',
        amount: 0,
        payment_date: date
      });
      this.showCreateForm.set(false);
    });
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
  
  createPayment(): void {
    this.onCreatePayment.emit(this.form);
    this.showCreateForm.set(false);
  }
}
