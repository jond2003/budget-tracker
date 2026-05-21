import { afterNextRender, booleanAttribute, Component, computed, ElementRef, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar/calendar';

type PaymentTypes = 'transaction' | 'income' | 'both';

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
  rowToDelete = signal<number>(-1);
  showCreateForm = signal(false);

  type = input.required<'transaction' | 'income' | 'both'>();

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
  
  @ViewChild('firstInput')
  firstInput?: ElementRef<HTMLInputElement>;

  constructor(private categoryApiService: CategoriesApiService, private calendarService: CalendarService, private fb: FormBuilder) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category_id: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [this.calendarService.getDate(), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.calendarService.date$.subscribe(date => {
      this.clearForm();
      this.showCreateForm.set(false);
    });
    this.getCategories();
  }

  clearForm() {
    this.form.setValue({
      label: '',
      category_id: '',
      amount: 0,
      payment_date: this.calendarService.getDate()
    });
  }

  toggleForm() {
    this.showCreateForm.set(!this.showCreateForm());
    this.clearForm();
    if (this.showCreateForm()) {
      setTimeout(() => this.firstInput?.nativeElement.focus());
    }
  }
  
  getCategories() {
    const setCategories = (cats: Category[]) => this.categories.set(cats as any);
    
    switch (this.type()) {
      case 'transaction':
        this.categoryApiService.getTransactionCategories().subscribe(setCategories);
        return;
      case 'income':
        this.categoryApiService.getIncomeCategories().subscribe(setCategories);
        return;
      case 'both':
        this.categoryApiService.getCategories().subscribe(setCategories);
        return;
      default:
        this.categoryApiService.getCategories().subscribe(setCategories);
        return;
    }
  }

  confirmDeleteRow(index: number) {
    this.rowToDelete.set(index);
  }
  
  deleteRow() {
    this.onDeleteRow.emit(this.rowToDelete());
    this.rowToDelete.set(-1);
  }

  cancelDeleteRow() {
    this.rowToDelete.set(-1);
  }
  
  createPayment(): void {
    this.onCreatePayment.emit(this.form);
    this.showCreateForm.set(false);
  }

  getTextColor(hex: string, negative=false): string {
    // remove #
    if (!hex) return '#ffffff'
    hex = hex.replace('#', '');

    // support shorthand (#fff)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(c => c + c)
        .join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const checkColour = brightness > 64 ? '#000000' : '#ffffff';
    const checkNegativeColour = brightness > 192 ? '#000000' : '#ffffff';

    return negative ? checkNegativeColour : checkColour;
  }

  getBackgroundColor(hex: string) {
    return this.getTextColor(hex, true);
  }
}
