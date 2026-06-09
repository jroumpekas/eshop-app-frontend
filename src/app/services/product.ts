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
        const productsWithFrontendData = productsFromBackend.map((product) =>
          this.addFrontendData(product)
        );

        this._products.set(productsWithFrontendData);
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

  private addFrontendData(product: Product): Product {
    const frontendData: Record<number, Partial<Product>> = {
      2: {
        oldPrice: 42.9,
        imageUrl: '/products/logitech-mouse.webp',
      },
      3: {
        oldPrice: 894.99,
        imageUrl: '/products/laptop-lenovo.webp',
      },
      5: {
        oldPrice: 110.99,
        imageUrl: '/products/keyboard-mechanical.webp',
      },
      6: {
        oldPrice: 193.9,
        imageUrl: '/products/monitor-samsung.webp',
      },

      7: {
        oldPrice: 950.9,
        imageUrl: '/products/iphone-15.webp'
      },

      8: {
        oldPrice: 889.9,
        imageUrl: 'products/samsung-s24.webp'
      },

      9: {

        imageUrl: 'products/sony-headers-m5.webp'
      },

      10: {

        imageUrl: 'products/apple-airpods2.webp'
      },

      11: {

        imageUrl: 'products/logitech-keyboard.webp'
      },

      12: {
        
        imageUrl: 'products/Dell-monitor.webp'
      },

      13: {
        oldPrice: 229.90,
        imageUrl: 'products/HP-printer.webp'
      },

      14: {
        
        imageUrl: 'products/External-ssd.webp'
      }



    };

    return {
      ...product,
      ...frontendData[product.id],
    };
  }
}