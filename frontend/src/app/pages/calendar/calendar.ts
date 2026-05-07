import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar';
import { ReceiptModal } from '../../components/receipt-modal/receipt-modal';

@Component({
  selector: 'app-calendar',
  imports: [ReceiptModal],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  days: any[] = [];
  month = {
    date: new Date(),
    totalDays: 30,
    text: 'April'
  };

  showReceipt = false;

  constructor(private calendarService: CalendarService) {
    this.updateMonth();
  }

  ngOnInit(): void {
  }

  updateMonth(): void {
    this.month = {
      date: this.calendarService.getDate(),
      totalDays: this.calendarService.getNumDays(),
      text: this.calendarService.getMonthText()
    }
    this.days = [];
    let arr = Array.from({ length: this.month.totalDays }, (_, i) => i + 1);
    for (let i = 0; i < arr.length; i += 5) {
      this.days.push(arr.slice(i, i + 5));
    }
  }

  incrementMonth(i: number): void {
    let d = new Date(this.calendarService.getYear(), this.calendarService.getMonth() + i, this.calendarService.getDate().getDate());
    this.calendarService.setDate(d);
    this.updateMonth();
  }

  viewDay(d: number): void {
    this.showReceipt = true;
    this.month.date.setDate(d);
  }
}
