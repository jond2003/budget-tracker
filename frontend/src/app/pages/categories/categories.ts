import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { API } from '../../constants/api.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = signal([] as any);
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      colour: ['#000000', [Validators.required]]
    });
    this.getCategories();
  }

  getCategories() {
    this.http.get(API.CATEGORIES_BASE_URL, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        this.categories.set(res as any);
        console.log(res);
      }
    );
  }

  addCategory() {
    const name = this.form.get('name')?.value as string;
    const colour = this.form.get('colour')?.value as string;
    const details = {
      name,
      colour
    }
    this.http.post(API.CATEGORIES_BASE_URL, details, { responseType: 'json', withCredentials: true }).subscribe(
      (res) => {
        console.log(res);
        // Note: update redux state whenever new category added
        this.getCategories();
      }
    );
  }
}
