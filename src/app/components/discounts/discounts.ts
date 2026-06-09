import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product';

@Component({
  selector: 'app-discount',
  imports: [ProductCard, RouterLink],
  templateUrl: './discounts.html',
  styleUrl: './discounts.css',
})
export class Discounts {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly offers = computed(() =>
    [...this.productService.products()]
      .filter((product) => product.oldPrice != null && product.oldPrice > product.price)
      .sort((a, b) => this.discountPercent(b) - this.discountPercent(a))
  );

  onAddToCart(product: Product): void {
    this.cart.add(product);
  }

  discountPercent(product: Product): number {
    if (product.oldPrice == null || product.oldPrice <= product.price) {
      return 0;
    }

    return Math.round((1 - product.price / product.oldPrice) * 100);
  }
}