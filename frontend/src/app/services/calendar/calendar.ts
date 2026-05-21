import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private date = new Date();
  
  private dateSubject = new BehaviorSubject<Date>(this.date);
  date$ = this.dateSubject.asObservable();

  public setMonth(i: number): void {
    this.date.setMonth(i);
    this.dateSubject.next(this.date);
  }

  public setDate(newDate: Date): void {
    this.date = new Date(newDate);
    this.dateSubject.next(this.date);
  }

  public setDayOfMonth(day: number): void {
    this.date.setDate(day);
    this.dateSubject.next(this.date);
  }

  public getMonth(): number {
    return this.date.getMonth();
  }

  public getDate(): Date {
    return new Date(this.date);
  }

  public setYear(m: number, y: number): void {
    this.date.setFullYear(y, m);
    this.dateSubject.next(this.date);
  }

  public getYear(): number {
    return this.date.getFullYear();
  }

  public getMonthText(len: 'long' | 'short' = 'long'): string {
    return this.date.toLocaleString('default', { month: len });
  }

  public getNumDays(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
  }
}
