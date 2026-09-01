import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  readonly isEmpty = computed(() => this.cartItems().length === 0);

  addToCart(product: Product): void {
    if (product.stock === 0) return;

    this.cartItemsSignal.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock)
              }
            : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  increaseQuantity(productId: string): void { // <-- string (UUID)
    this.cartItemsSignal.update(items =>
      items.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock)
            }
          : item
      )
    );
  }

  decreaseQuantity(productId: string): void { // <-- string (UUID)
    this.cartItemsSignal.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  removeFromCart(productId: string): void { // <-- string (UUID)
    this.cartItemsSignal.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}