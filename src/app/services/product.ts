import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/products';

  private readonly _products = signal<Product[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _errorMessage = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly errorMessage = this._errorMessage.asReadonly();

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this._isLoading.set(true);
    this._errorMessage.set(null);

    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (productsFromBackend) => {
        this._products.set(productsFromBackend);
        this._isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this._errorMessage.set('Δεν ήταν δυνατή η φόρτωση των προϊόντων.');
        this._isLoading.set(false);
      },
    });
  }

  getById(id: number): Product | undefined {
    return this._products().find((product) => product.id === id);
  }
}