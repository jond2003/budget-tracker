import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { API } from '../../../constants/api.constants';
import { Payment } from '../../../models/payment.model';
import { Store } from '../../../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeApiService {
  private incomes: Store<Payment> = {
    data: of([]),
    update: true
  };

  private catsIncomes: Record<string, Store<Payment>> = {}
  private monthIncomes: Record<string, Store<Payment>> = {}

  constructor(private http: HttpClient) { }

  getIncomes(forceUpdate = false): Observable<Payment[]> {
    if (!this.incomes.update && !forceUpdate) return this.incomes.data;
    this.incomes.data = this.http.get<Payment[]>(API.INCOMES_BASE_URL, { responseType: 'json', withCredentials: true });
    this.incomes.update = false;
    return this.incomes.data;
  }

  createIncome(income: Payment): Observable<any> {
    this.incomes.update = true;
    // On next get for category, fetch category transactions from server
    if (this.catsIncomes[income.category_id]) {
      this.catsIncomes[income.category_id].update = true;
    }
    return this.http.post(API.INCOMES_BASE_URL, income, { responseType: 'json', withCredentials: true });
  }

  getIncomesByCategory(category_id: string, forceUpdate = false): Observable<Payment[]> {
    // Create store if not created already
    if (!this.catsIncomes[category_id]) {
      this.catsIncomes[category_id] = {
        data: of([]),
        update: true
      };
    }
    
    if (!this.catsIncomes[category_id].update && !forceUpdate) return this.catsIncomes[category_id].data;
    this.catsIncomes[category_id].data = this.http.get<Payment[]>(API.CATEGORY_INCOMES + category_id, { responseType: 'json', withCredentials: true });
    this.catsIncomes[category_id].update = false;
    return this.catsIncomes[category_id].data;
  }

  getIncomesByMonth(date: Date, forceUpdate = false): Observable<Payment[]> {
    const key = date.getMonth() + '/' + date.getFullYear();
    // Create store if not created already
    if (!this.monthIncomes[key]) {
      this.monthIncomes[key] = {
        data: of([]),
        update: true
      };
    }

    if (!this.monthIncomes[key].update && !forceUpdate) return this.monthIncomes[key].data;
    this.monthIncomes[key].data = this.http.get<Payment[]>(API.MONTH_INCOMES + date, { responseType: 'json', withCredentials: true });
    this.monthIncomes[key].update = false;
    return this.monthIncomes[key].data
  }

  deleteIncome(income: Payment): Observable<any> {
    const date = new Date(income.payment_date);
    const key = date.getMonth() + '/' + date.getFullYear();
    this.incomes.update = true;
    if (this.monthIncomes[key]) this.monthIncomes[key].update = true;
    if (this.catsIncomes[income.category_id]) this.catsIncomes[income.category_id].update = true;
    return this.http.delete(API.INCOMES_BASE_URL + income._id, { responseType: 'json', withCredentials: true });
  }
}
