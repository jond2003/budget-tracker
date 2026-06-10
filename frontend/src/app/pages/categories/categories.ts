import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { Category } from '../../models/category.model';
import { NgClass } from '@angular/common';
import { Edit } from "../../components/edit/edit";
import { CategoryDropdown } from "../../components/category-dropdown/category-dropdown";

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, NgClass, Edit, CategoryDropdown],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = signal<Category[]>([]);
  form: FormGroup;
  rowToDelete = signal<number>(-1);
  rowToEdit = signal<number>(-1);
  openEditModal = signal(false);
  

  constructor(private categoryApiService: CategoriesApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      payment_type: ['transaction', [Validators.required, Validators.minLength(1)]],
      primary_colour: ['#000000', [Validators.required]],
      secondary_colour: ['#ffffff', [Validators.required]]
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
      primary_colour: this.form.get('primary_colour')?.value as string,
      secondary_colour: this.form.get('secondary_colour')?.value as string
    }
    this.categoryApiService.createCategory(newCategory).subscribe(() => this.getCategories());
  }

  editCategory(updatedForm: FormGroup) {
    const originalCategory = this.categories()[this.rowToEdit()];
    const newCategory: Category = {
      ...originalCategory,
      name: updatedForm.get('new_name')?.value,
      primary_colour: updatedForm.get('new_primary_colour')?.value,
      secondary_colour: updatedForm.get('new_secondary_colour')?.value
    };
    this.categoryApiService.editCategory(newCategory).subscribe(res => {
      this.categories.update(arr => {
        const c = [...arr];
        c[this.rowToEdit()] = res;
        return c;
      });
    });
  }

  deleteCategory() {
    this.categoryApiService.deleteCategory(this.categories()[this.rowToDelete()]).subscribe(() => {
      this.getCategories();
      this.rowToDelete.set(-1);
    });
  }

  confirmDeleteRow(index: number) {
    this.rowToDelete.set(index);
  }
  
  deleteRow() {
    this.deleteCategory();
  }

  cancelDeleteRow() {
    this.rowToDelete.set(-1);
  }

  editRow(index: number) {
    this.rowToEdit.set(index);
    this.openEditModal.set(true);
  }

  closeModal() {
    this.openEditModal.set(false);
  }
}
