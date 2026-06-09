import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  isSubmitted = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = {
      username: this.loginForm.controls.username.value!,
      password: this.loginForm.controls.password.value!,
    };

    this.isLoading.set(true);

    this.authService
      .login(request)
      .pipe(
        switchMap(() => this.authService.loadCurrentUser())
      )
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Λάθος username ή password.');
        },
      });
  }
}