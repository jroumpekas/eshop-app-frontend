import { Component, inject } from '@angular/core';
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
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly products = this.productService.products;
  readonly isLoading = this.productService.isLoading;
  readonly errorMessage = this.productService.errorMessage;

  onAddToCart(product: Product): void {
    this.cart.add(product);
  }
}