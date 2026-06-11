import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

const STORAGE_KEY = 'fullmarket_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  removeFromCart(productId: number) {
    throw new Error('Method not implemented.');
  }
  clearCart() {
    throw new Error('Method not implemented.');
  }
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());

  // Δημόσιο read-only state + παράγωγα signals
  readonly items = this._items.asReadonly();
  readonly totalCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0),
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );
  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    // Αυτόματη αποθήκευση στο localStorage σε κάθε αλλαγή.
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  add(product: Product, qty = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + qty, product.stock) }
            : i,
        );
      }
      return [...items, { product, quantity: Math.min(qty, product.stock) }];
    });
  }

  remove(productId: number): void {
    this._items.update((items) =>
      items.filter((i) => i.product.id !== productId),
    );
  }

  updateQuantity(productId: number, qty: number): void {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this._items.update((items) =>
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i,
      ),
    );
  }

  clear(): void {
    this._items.set([]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}