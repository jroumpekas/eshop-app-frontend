import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isSubmitted = false;

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
      ],
    ],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request = {
      username: this.registerForm.controls.username.value!,
      email: this.registerForm.controls.email.value!,
      password: this.registerForm.controls.password.value!,
      firstName: this.registerForm.controls.firstName.value!,
      lastName: this.registerForm.controls.lastName.value!,
    };

    this.isLoading.set(true);

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Η εγγραφή ολοκληρώθηκε επιτυχώς.');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 800);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Η εγγραφή απέτυχε. Ελέγξτε τα στοιχεία σας.');
      },
    });
  }
}