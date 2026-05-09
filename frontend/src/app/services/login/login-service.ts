import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { API } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getData(url: string) {
    return this.http.get(url, {responseType: 'text'});
  }

  postData(url: string, body: any) {
    return this.http.post(url, body, {responseType: 'text'});
  }

  public login(formData: FormGroup): Observable<Object> {
    const email = formData.get('email')?.value as string;
    const password = formData.get('password')?.value as string;
    const details: UserModel.LoginUser = {
      email,
      password
    }

    const res = this.http.post(API.LOGIN, details, { withCredentials: true });
    return res;
  }

  public register(formData: FormGroup): Observable<Object> {
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
}
