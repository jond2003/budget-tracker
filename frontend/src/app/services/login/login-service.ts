import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { API } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedInSubject = new BehaviorSubject(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoggedIn();
  }

  checkLoggedIn(): Observable<{ authenticated: boolean }> {
    const obs = this.http.get<{ authenticated: boolean }>(API.AUTH_USER, { withCredentials: true })
    obs.subscribe(res => {
      this.loggedInSubject.next(res.authenticated);
    });
    return obs;
  }

  login(formData: FormGroup): Observable<any> {
    const email = formData.get('email')?.value as string;
    const password = formData.get('password')?.value as string;
    const details: UserModel.LoginUser = {
      email,
      password
    }

    const res = this.http.post(API.LOGIN, details, { withCredentials: true });
    return res;
  }

  register(formData: FormGroup): Observable<any> {
    const email = formData.get('email')?.value as string;
    const firstname = formData.get('firstname')?.value as string;
    const lastname = formData.get('lastname')?.value as string;
    const password = formData.get('password')?.value as string;
    const details: UserModel.CreateUser = {
      email,
      firstname,
      lastname,
      password
    }

    const res = this.http.post(API.REGISTER, details, { withCredentials: true });
    return res;
  }

  logout(): Observable<Object> {
    try {
      const res = this.http.post(API.LOGOUT, {}, { withCredentials: true });
      this.loggedInSubject.next(false);
      return res;
    }
    catch (err: any) {
      return of(err);
    }
  }

  getUserDetails(): Observable<UserModel.UserDetails> {
    return this.http.get<UserModel.UserDetails>(API.USER_BASE_URL, { withCredentials: true });
  }

  setLoggedIn(): void {
    this.loggedInSubject.next(true);
  }
}
