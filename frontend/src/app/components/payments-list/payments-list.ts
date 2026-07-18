import { booleanAttribute, Component, computed, effect, ElementRef, input, OnInit, output, signal, ViewChild } from '@angular/core';
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
  rowsToEdit: number[] = [];
  showCreateForm = signal(false);

  rte = computed(() => this.payments().filter(p => p._id == "-1"));

  type = input.required<'transaction' | 'income' | 'both'>();

  totalAmount = computed(() => this.payments().reduce((acc: number, c: any) => acc + c.amount, 0));
  resetDisableRow = computed(() => {
    const arr = this.payments();
    this.disableRow.set(-1);
    console.log('disable row', this.disableRow());
  });

  onDeleteRow = output<number>();
  onCreatePayment = output<FormGroup>();
  onEditRow = output<Payment>();
  
  categories = signal<Category[]>([]);

  form: FormGroup;
  editForm: FormGroup = new FormGroup([]);
  
  @ViewChild('firstInput')
  firstInput?: ElementRef<HTMLInputElement>;

  constructor(private categoryApiService: CategoriesApiService, private calendarService: CalendarService, private fb: FormBuilder) {
    this.form = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      category_id: ['', [Validators.required, Validators.minLength(1)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      payment_date: [this.calendarService.getDate(), [Validators.required]],
    });
    effect(() => {
      const ps = this.payments().length;
      this.rowsToEdit = [];
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.removeControl(key);
      });
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
    console.log('delete', this.rowToDelete());
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

  enableEditing(index: number) {
    this.editForm.addControl('edit-'+index, this.fb.group({
      label: [this.payments()[index].label, [Validators.required, Validators.minLength(1)]],
      category_id: [this.payments()[index].category_id, [Validators.required, Validators.minLength(1)]],
      amount: [this.payments()[index].amount, [Validators.required, Validators.min(0)]],
      payment_date: [this.convertDate(new Date(this.payments()[index].payment_date)), [Validators.required]],
    }));
    this.rowsToEdit.push(index);
  }

  editRow(index: number) {
    const f = this.editForm.get('edit-'+index)!;
    const originalPayment: Payment = this.payments()[index];
    const updatedPayment: Payment = {
      _id: originalPayment._id,
      label: f.get('label')?.value as string,
      category_id: f.get('category_id')?.value as string,
      amount: f.get('amount')?.value as number,
      payment_date: f.get('payment_date')?.value as Date,
    }
    this.rowsToEdit = this.rowsToEdit.filter(i => i !== index);
    this.editForm.removeControl('edit-'+index);
    this.onEditRow.emit(updatedPayment);
  }

  cancelEditRow(index: number) {
    this.rowsToEdit = this.rowsToEdit.filter(i => i !== index);
    this.editForm.removeControl('edit-'+index);
  }

  convertDate(date: Date): string {
    return date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0');
  }
}
