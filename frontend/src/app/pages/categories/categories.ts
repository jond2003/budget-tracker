import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = signal<Category[]>([]);
  form: FormGroup;

  constructor(private categoryApiService: CategoriesApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      payment_type: ['transaction', [Validators.required, Validators.minLength(1)]],
      colour: ['#000000', [Validators.required]]
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryApiService.getCategories().subscribe((res) => this.categories.set(res));
  }

  addCategory() {
    const newCategory: Category = {
      name: this.form.get('name')?.value as string,
      payment_type: this.form.get('payment_type')?.value,
      colour: this.form.get('colour')?.value as string
    }
    this.categoryApiService.createCategory(newCategory).subscribe(() => this.getCategories());
  }
}
