import { TitleCasePipe } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit {
  formType = input.required<'category' | 'payment' | 'budget'>();
  data = input.required<any>();
  onFormSubmit = output<FormGroup>();
  onClose = output();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    switch (this.formType()) {
      case 'category':
        return this.fb.group({
          new_name: [this.data().name, [Validators.required, Validators.minLength(1)]],
          new_primary_colour: [this.data().primary_colour || '#000000', [Validators.required]],
          new_secondary_colour: [this.data().secondary_colour || '#ffffff', [Validators.required]]
        });
      case 'payment':
        return this.fb.group({});
      case 'budget':
        return this.fb.group({});
      default:
        return this.fb.group({});
    }
  }

  submitForm() {
    this.onFormSubmit.emit(this.form);
    this.closeModal();
  }

  closeModal() {
    this.onClose.emit();
  }
}
