import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly router = inject(Router);

  readonly authService = inject(AuthService);
  readonly themeService = inject(ThemeService);
  readonly cartService = inject(CartService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}