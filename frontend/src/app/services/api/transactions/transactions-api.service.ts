import { Injectable } from '@angular/core';
import { Store } from '../../../models/store.model';
import { Observable, of } from 'rxjs';
import { Payment } from '../../../models/payment.model';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  private trns: Store<Payment> = {
    data: of([]),
    update: true
  };

  private catsTrns: Record<string, Store<Payment>> = {}
  private monthTrxns: Record<string, Store<Payment>> = {}

  constructor(private http: HttpClient) { }

  getTransactions(forceUpdate = false): Observable<Payment[]> {
    if (!this.trns.update && !forceUpdate) return this.trns.data;
    this.trns.data = this.http.get<Payment[]>(API.TRANSACTIONS_BASE_URL, { responseType: 'json', withCredentials: true });
    this.trns.update = false;
    return this.trns.data;
  }

  createTransaction(transaction: Payment): Observable<any> {
    this.trns.update = true;
    // On next get for category, fetch category transactions from server
    if (this.catsTrns[transaction.category_id]) {
      this.catsTrns[transaction.category_id].update = true;
    }
    return this.http.post(API.TRANSACTIONS_BASE_URL, transaction, { responseType: 'json', withCredentials: true });
  }

  getTransactionsByCategory(category_id: string, forceUpdate = false): Observable<Payment[]> {
    // Create store if not created already
    if (!this.catsTrns[category_id]) {
      this.catsTrns[category_id] = {
        data: of([]),
        update: true
      };
    }
    
    if (!this.catsTrns[category_id].update && !forceUpdate) return this.catsTrns[category_id].data;
    this.catsTrns[category_id].data = this.http.get<Payment[]>(API.CATEGORY_TRANSACTIONS + category_id, { responseType: 'json', withCredentials: true });
    this.catsTrns[category_id].update = false;
    return this.catsTrns[category_id].data;
  }

  getIncomesByMonth(date: Date, forceUpdate = false): Observable<Payment[]> {
    const key = date.getMonth() + '/' + date.getFullYear();
    // Create store if not created already
    if (!this.monthTrxns[key]) {
      this.monthTrxns[key] = {
        data: of([]),
        update: true
      };
    }

    if (!this.monthTrxns[key].update && !forceUpdate) return this.monthTrxns[key].data;
    this.monthTrxns[key].data = this.http.get<Payment[]>(API.MONTH_TRANSACTIONS + date, { responseType: 'json', withCredentials: true });
    this.monthTrxns[key].update = false;
    return this.monthTrxns[key].data
  }

  deleteTransaction(trx: Payment): Observable<any> {
    const date = new Date(trx.payment_date);
    const key = date.getMonth() + '/' + date.getFullYear();
    this.trns.update = true;
    if (this.monthTrxns[key]) this.monthTrxns[key].update = true;
    if (this.catsTrns[trx.category_id]) this.catsTrns[trx.category_id].update = true;
    return this.http.delete(API.TRANSACTIONS_BASE_URL + trx._id, { responseType: 'json', withCredentials: true });
  }
}
