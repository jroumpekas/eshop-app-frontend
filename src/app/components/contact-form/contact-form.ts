import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  private fb = inject(FormBuilder);

  isSubmitted = false;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
  });

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Contact form submitted:', this.contactForm.value);

    alert('Το μήνυμά σας στάλθηκε επιτυχώς!');

    this.contactForm.reset({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false,
    });

    this.isSubmitted = false;
  }
}