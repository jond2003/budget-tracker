import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private date = new Date();

  public setMonth(i: number): void {
    this.date.setMonth(i);
  }

  public setDate(newDate: Date): void {
    this.date = new Date(newDate);
  }

  public getMonth(): number {
    return this.date.getMonth();
  }

  public getDate(): Date {
    return new Date(this.date);
  }

  public setYear(m: number, y: number): void {
    this.date.setFullYear(y, m);
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
