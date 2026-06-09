import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected readonly cart = inject(CartService);

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',') + ' €';
  }

  increment(item: CartItem): void {
    this.cart.updateQuantity(
      item.product.id,
      Math.min(item.quantity + 1, item.product.stock),
    );
  }

  decrement(item: CartItem): void {
    this.cart.updateQuantity(item.product.id, item.quantity - 1);
  }

  remove(productId: number): void {
    this.cart.remove(productId);
  }

  clear(): void {
    this.cart.clear();
  }
}