import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() showDiscount = false;

  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  hasDiscount(): boolean {
    return (
      this.showDiscount &&
      this.product.oldPrice != null &&
      this.product.oldPrice > this.product.price
    );
  }

  discountPercent(): number {
    if (!this.product.oldPrice || this.product.oldPrice <= this.product.price) {
      return 0;
    }

    return Math.round((1 - this.product.price / this.product.oldPrice) * 100);
  }
}