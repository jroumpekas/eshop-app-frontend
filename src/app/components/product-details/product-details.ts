import { Component, OnInit, inject, signal } from '@angular/core';
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
export class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly product = signal<Product | null>(null);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    // 1. Παίρνουμε το UUID από το URL (ως string)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. Πρώτα κοιτάμε αν υπάρχει ήδη στη μνήμη του Service
      const localProduct = this.productService.getById(id);

      if (localProduct) {
        this.product.set(localProduct);
        this.isLoading.set(false);
      } else {
        // 3. Αν δεν υπάρχει, κάνουμε HTTP GET /api/products/{id} στο Spring Boot
        this.productService.getByIdFromBackend(id).subscribe({
          next: (data) => {
            this.product.set(data);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error('Error fetching product:', err);
            this.isLoading.set(false);
          },
        });
      }
    }
  }

  onAddToCart(product: Product): void {
    this.cart.addToCart(product);
  }

  hasDiscount(product: Product): boolean {
    return product.oldPrice != null && product.oldPrice > product.price;
  }

  discountPercent(product: Product): number {
    if (!this.hasDiscount(product)) return 0;
    return Math.round((1 - product.price / product.oldPrice!) * 100);
  }
}