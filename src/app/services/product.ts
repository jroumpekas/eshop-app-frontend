import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse, Product } from '../models/product';
import { environment } from '../../environment/environment';

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  oldPrice?: number | null;
  category?: string | null;
  rating?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  readonly apiUrl = `${environment.apiUrl}/products`;

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

  createProduct(payload: ProductPayload): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, payload);
  }

  updateProduct(id: number, payload: ProductPayload): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, payload);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaginatedProducts(page: number = 0, size: number = 3, sort: string = 'name') {
  return this.http.get<PageResponse<Product>>(
    `${this.apiUrl}/paged?page=${page}&size=${size}&sort=${sort}`
  );
}
}