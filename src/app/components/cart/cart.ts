import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrdersService } from '../../services/order';
import { CheckoutRequest } from '../../models/checkout-request';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly cart = inject(CartService);

  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  isCheckingOut = signal(false);
  checkoutError = signal<string | null>(null);
  checkoutSuccess = signal<string | null>(null);

  formatPrice(price: number): string {
    return `${price.toFixed(2)} €`;
  }

  increment(item: CartItem): void {
    if (item.quantity >= item.product.stock) {
      return;
    }

    this.cart.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrement(item: CartItem): void {
    if (item.quantity <= 1) {
      this.remove(item.product.id);
      return;
    }

    this.cart.updateQuantity(item.product.id, item.quantity - 1);
  }

  remove(productId: number): void {
    this.cart.removeFromCart(productId);
  }

  clear(): void {
    this.cart.clearCart();
    this.checkoutError.set(null);
    this.checkoutSuccess.set(null);
  }

  checkout(): void {
    this.checkoutError.set(null);
    this.checkoutSuccess.set(null);

    const cartItems = this.cart.items();

    if (cartItems.length === 0) {
      this.checkoutError.set('Το καλάθι είναι άδειο.');
      return;
    }

    const request: CheckoutRequest = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    this.isCheckingOut.set(true);

    this.ordersService.checkout(request).subscribe({
      next: () => {
        this.isCheckingOut.set(false);
        this.checkoutSuccess.set('Η παραγγελία ολοκληρώθηκε επιτυχώς.');

        this.cart.clearCart();

        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 800);
      },
      error: (error) => {
        console.error('Checkout error:', error);

        this.isCheckingOut.set(false);

        if (error.status === 401 || error.status === 403) {
          this.checkoutError.set(
            'Πρέπει να συνδεθείτε για να ολοκληρώσετε την παραγγελία.'
          );
          return;
        }

        if (error.status === 400) {
          this.checkoutError.set('Τα στοιχεία της παραγγελίας δεν είναι έγκυρα.');
          return;
        }

        this.checkoutError.set('Δεν ήταν δυνατή η ολοκλήρωση της παραγγελίας.');
      },
    });
  }
}