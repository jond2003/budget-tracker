import { Injectable } from '@angular/core';
import { API } from '../../../constants/api.constants';
import { Budget } from '../../../models/budget.model';
import { Observable, of } from 'rxjs';
import { Store } from '../../../models/store.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BudgetApiService {
  private budgets: Store<Budget> = {
    data: of([]),
    update: true
  };

  private catsBudgets: Record<string, Store<Budget>> = {}
  private monthBudgets: Record<string, Store<Budget>> = {}

  constructor(private http: HttpClient) { }

  getBudgets(forceUpdate = false): Observable<Budget[]> {
    if (!this.budgets.update && !forceUpdate) return this.budgets.data;
    this.budgets.data = this.http.get<Budget[]>(API.ALL_BUDGETS, { responseType: 'json', withCredentials: true });
    this.budgets.update = false;
    return this.budgets.data;
  }

  getGeneralBudgets(forceUpdate = false): Observable<Budget[]> {
    if (!this.budgets.update && !forceUpdate) return this.budgets.data;
    this.budgets.data = this.http.get<Budget[]>(API.BUDGETS_BASE_URL, { responseType: 'json', withCredentials: true });
    this.budgets.update = false;
    return this.budgets.data;
  }

  getNetWorth(): Observable<number> {
    return this.http.get<number>(API.NET_WORTH, { responseType: 'json', withCredentials: true });
  }

  createBudget(budget: Budget): Observable<any> {
    this.budgets.update = true;
    // On next get for category, fetch category transactions from server
    if (this.catsBudgets[budget.category_id]) {
      this.catsBudgets[budget.category_id].update = true;
    }
    return this.http.post(API.BUDGETS_BASE_URL, budget, { responseType: 'json', withCredentials: true });
  }
  
  getBudgetsByCategory(category_id: string, forceUpdate = false): Observable<Budget[]> {
    // Create store if not created already
    if (!this.catsBudgets[category_id]) {
      this.catsBudgets[category_id] = {
        data: of([]),
        update: true
      };
    }
    
    if (!this.catsBudgets[category_id].update && !forceUpdate) return this.catsBudgets[category_id].data;
    this.catsBudgets[category_id].data = this.http.get<Budget[]>(API.CATEGORY_BUDGETS + category_id, { responseType: 'json', withCredentials: true });
    this.catsBudgets[category_id].update = false;
    return this.catsBudgets[category_id].data;
  }

  getBudgetsByMonth(date: Date, forceUpdate = false): Observable<Budget[]> {
    const key = date.getMonth() + '/' + date.getFullYear();
    // Create store if not created already
    if (!this.monthBudgets[key]) {
      this.monthBudgets[key] = {
        data: of([]),
        update: true
      };
    }

    if (!this.monthBudgets[key].update && !forceUpdate) return this.monthBudgets[key].data;
    this.monthBudgets[key].data = this.http.get<Budget[]>(API.MONTH_BUDGET + date, { responseType: 'json', withCredentials: true });
    this.monthBudgets[key].update = false;
    return this.monthBudgets[key].data
  }

  deleteBudget(budget: Budget): Observable<any> {
    this.budgets.update = true;
    return this.http.delete(API.BUDGETS_BASE_URL + budget._id, { responseType: 'json', withCredentials: true });
  }
}
