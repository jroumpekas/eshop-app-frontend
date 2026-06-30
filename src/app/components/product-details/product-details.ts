import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  private readonly productId = Number(this.route.snapshot.paramMap.get('id'));

  readonly product = computed(() =>
    this.productService.getById(this.productId)
  );

  onAddToCart(product: Product): void {
    this.cart.addToCart(product);
  }

  hasDiscount(product: Product): boolean {
    return product.oldPrice != null && product.oldPrice > product.price;
  }

  discountPercent(product: Product): number {
    if (!this.hasDiscount(product)) {
      return 0;
    }

    return Math.round((1 - product.price / product.oldPrice!) * 100);
  }
}