import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  totalElements = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productService
      .getPaginatedProducts(this.currentPage, this.pageSize, 'name')
      .subscribe({
        next: (response) => {
          this.products.set(response.content);
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.currentPage = response.number;
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Could not load products.');
          this.isLoading.set(false);
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  onAddToCart(product: Product): void {
    this.cart.addToCart(product);
  }
}