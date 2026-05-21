import { Component, computed, signal } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar';
import { ReceiptModal } from '../../components/receipt-modal/receipt-modal';
import { DecimalPipe, NgClass } from '@angular/common';
import { IncomeApiService } from '../../services/api/income/income-api.service';
import { TransactionsApiService } from '../../services/api/transactions/transactions-api.service';
import { PaymentsList } from "../../components/payments-list/payments-list";
import { FormGroup } from '@angular/forms';
import { Payment } from '../../models/payment.model';
import { MoneyCard } from "../../components/money-card/money-card";
import { BudgetApiService } from '../../services/api/budgets/budget-api.service';

@Component({
  selector: 'app-calendar',
  imports: [ReceiptModal, NgClass, DecimalPipe, PaymentsList, MoneyCard],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  days: any[] = [];
  month = {
    date: new Date(),
    totalDays: 30,
    text: 'April'
  };
  
  incomes = signal<Payment[]>([]);
  transactions = signal<Payment[]>([] as any);
  pendingIncomes = signal<Payment[]>([] as any);
  netWorth = signal<number>(0);

  income = computed(() => this.incomes().reduce((acc: number, c: any) => acc + c.amount, 0));
  expenses = computed(() => this.transactions().reduce((acc: number, c: any) => acc + c.amount, 0));
  pendingIncome = computed(() => this.pendingIncomes().reduce((acc: number, c: any) => acc + c.amount, 0));

  showReceipt = false;
  selectedDay = 0;

  constructor(
    private incomeApiService: IncomeApiService,
    private transactionApiService: TransactionsApiService,
    public calendarService: CalendarService,
    private budgetApiService: BudgetApiService
  ) {
    this.updateMonth();
  }

  updateMonth(): void {
    this.month = {
      date: this.calendarService.getDate(),
      totalDays: this.calendarService.getNumDays(),
      text: this.calendarService.getMonthText()
    }
    this.days = [];
    let arr = Array.from({ length: this.month.totalDays + this.getDayWeekOffset() }, (_, i) => i + 1 - this.getDayWeekOffset());
    for (let i = 0; i < arr.length; i += 7) {
      this.days.push(arr.slice(i, i + 7));
    }
    // console.log(this.getDayWeekOffset(), this.days);
    this.getMonthIncomes();
    this.getMonthTransactions();
    this.getPendingIncomes();
  }

  incrementMonth(i: number): void {
    let d = new Date(this.calendarService.getYear(), this.calendarService.getMonth() + i, this.calendarService.getDate().getDate());
    this.calendarService.setDate(d);
    this.selectedDay = 0;
    this.updateMonth();
  }

  viewDay(d: number): void {
    this.showReceipt = true;
    this.selectedDay = d;
    this.month.date.setDate(d);
    this.calendarService.setDayOfMonth(d);
  }

  getDay(d: string): number {
    return (new Date(d)).getDate();
  }

  getRealCurrentDay(): number {
    return (new Date()).getDate();
  }

  isRealCurrentMonth(): boolean {
    return (new Date()).getMonth() == this.month.date.getMonth();
  }

  getDayOfWeek(d: number): number {
    const date = new Date(
      this.calendarService.getYear(),
      this.calendarService.getMonth(),
      d);
    return date.getDay();
  }

  getDayWeekOffset(): number {
    const date = new Date(
      this.calendarService.getYear(),
      this.calendarService.getMonth(),
      1);
    return (date.getDay() + 6) % 7;
  }

  getDayTransactions(day: number): any[] {
    return this.transactions().filter((v: any) => this.getDay(v.payment_date) == day);
  }

  getDayIncomes(day: number): any[] {
    return this.pendingIncomes().filter((v: any) => this.getDay(v.payment_date) == day);
  }
  
  getMonthIncomes() {
    const prevMonth = new Date(
      this.calendarService.getYear(),
      this.calendarService.getMonth()-1,
      this.calendarService.getDate().getDate()
    );
    this.incomeApiService.getIncomesByMonth(prevMonth).subscribe(
      (res) => {
        this.incomes.set(res as any);
      }
    );
  }
  
  getPendingIncomes() {
    this.incomeApiService.getIncomesByMonth(this.month.date).subscribe(
      (res) => {
        this.pendingIncomes.set(res as any);
        this.getNetWorth();
      }
    );
  }
  
  getMonthTransactions() {
    this.transactionApiService.getIncomesByMonth(this.month.date).subscribe(
      (res) => {
        this.transactions.set(res as any);
        this.getNetWorth();
      }
    );
  }

  getNetWorth() {
    this.budgetApiService.getNetWorth().subscribe((res) => {
      this.netWorth.set(res);
    });
  }

  createTransaction(form: FormGroup): void {
    const transaction: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.transactionApiService.createTransaction(transaction).subscribe(() => this.getMonthTransactions());
  }

  createIncome(form: FormGroup): void {
    const income: Payment = {
      label: form.get('label')?.value as string,
      category_id: form.get('category_id')?.value as string,
      amount: form.get('amount')?.value as number,
      payment_date: form.get('payment_date')?.value as number
    }
    this.incomeApiService.createIncome(income).subscribe(() => this.getPendingIncomes());
  }
}
