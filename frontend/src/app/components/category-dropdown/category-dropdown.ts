import { Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { Category } from '../../models/category.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-dropdown',
  imports: [NgClass],
  templateUrl: './category-dropdown.html',
  styleUrl: './category-dropdown.css',
})
export class CategoryDropdown {
  categories = input.required<Category[]>();
  selectedCategory = signal<Category | null>(null);
  onSelectCategory = output<Category>();

  showDropdown = signal(false);

  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  focusInput() {
    this.showDropdown.set(true);
    this.textInput.nativeElement.focus();
  }

  selectCategory(i: number) {
    const category = this.categories()[i];
    this.selectedCategory.set(category);
    this.onSelectCategory.emit(category);
    this.showDropdown.set(false);
  }
}
