import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html'
})
export class Cart {
  readonly cartService = inject(CartService);

  increase(productId: string): void { // <-- string (UUID)
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: string): void { // <-- string (UUID)
    this.cartService.decreaseQuantity(productId);
  }

  remove(productId: string): void { // <-- string (UUID)
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}