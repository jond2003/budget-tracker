import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../constants/api.constants';
import { Observable, of, combineLatest, map } from 'rxjs';
import { Category } from '../../../models/category.model';
import { Store } from '../../../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private catsStore: Record<'income' | 'transaction', Store<Category>> = {
    income: { data: of([]), update: true },
    transaction: { data: of([]), update: true }
  };

  constructor(private http: HttpClient) { }

  getCategories(forceUpdate = false): Observable<Category[]> {
    return combineLatest([this.getTransactionCategories(), this.getIncomeCategories()]).pipe(
      map(([incomeArr, txArr]) => [...incomeArr, ...txArr])
    );
  }

  getIncomeCategories(forceUpdate = false): Observable<Category[]> {
    if (!this.catsStore.income.update && !forceUpdate) return this.catsStore.income.data;
    this.catsStore.income.data = this.http.get<Category[]>(API.INCOME_CATEGORIES, { responseType: 'json', withCredentials: true });
    this.catsStore.income.update = false;
    return this.catsStore.income.data;
  }

  getTransactionCategories(forceUpdate = false): Observable<Category[]> {
    if (!this.catsStore.transaction.update && !forceUpdate) return this.catsStore.transaction.data;
    this.catsStore.transaction.data = this.http.get<Category[]>(API.TRANSACTIONS_CATEGORIES, { responseType: 'json', withCredentials: true });
    this.catsStore.transaction.update = false;
    return this.catsStore.transaction.data;
  }

  createCategory(category: Category): Observable<any> {
    this.catsStore[category.payment_type].update = true;
    return this.http.post(API.CATEGORIES_BASE_URL, category, { responseType: 'json', withCredentials: true });
  }
}
