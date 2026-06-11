import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductPayload, ProductService } from '../../services/product';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);

  products = this.productService.products;
  isLoading = this.productService.isLoading;

  isSaving = signal(false);
  isEditing = signal(false);
  editingProductId = signal<number | null>(null);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  pageTitle = computed(() =>
    this.isEditing() ? 'Επεξεργασία προϊόντος' : 'Προσθήκη προϊόντος'
  );

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    oldPrice: [null as number | null],
    category: [''],
    rating: [null as number | null],
  });

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  submit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMessage.set('Συμπληρώστε σωστά τα απαραίτητα πεδία.');
      return;
    }

    const payload = this.buildPayload();

    this.isSaving.set(true);

    if (this.isEditing() && this.editingProductId() !== null) {
      this.productService.updateProduct(this.editingProductId()!, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.successMessage.set('Το προϊόν ενημερώθηκε επιτυχώς.');
          this.resetForm();
          this.productService.loadProducts();
        },
        error: (error) => this.handleError(error),
      });

      return;
    }

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set('Το προϊόν δημιουργήθηκε επιτυχώς.');
        this.resetForm();
        this.productService.loadProducts();
      },
      error: (error) => this.handleError(error),
    });
  }

  editProduct(product: Product): void {
    this.isEditing.set(true);
    this.editingProductId.set(product.id);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl ?? '',
      oldPrice: product.oldPrice ?? null,
      category: product.category ?? '',
      rating: product.rating ?? null,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(product: Product): void {
    const confirmed = confirm(`Θέλετε σίγουρα να διαγράψετε το προϊόν "${product.name}";`);

    if (!confirmed) {
      return;
    }

    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.successMessage.set('Το προϊόν διαγράφηκε επιτυχώς.');
        this.productService.loadProducts();
      },
      error: (error) => this.handleError(error),
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  hasDiscount(product: Product): boolean {
    return product.oldPrice !== null &&
      product.oldPrice !== undefined &&
      product.oldPrice > product.price;
  }

  formatPrice(price: number | null | undefined): string {
    if (price === null || price === undefined) {
      return '-';
    }

    return `${price.toFixed(2)} €`;
  }

  private buildPayload(): ProductPayload {
    const value = this.productForm.getRawValue();

    return {
      name: value.name ?? '',
      description: value.description ?? '',
      price: Number(value.price),
      stock: Number(value.stock),
      imageUrl: value.imageUrl?.trim() || null,
      oldPrice: value.oldPrice !== null && value.oldPrice !== undefined
        ? Number(value.oldPrice)
        : null,
      category: value.category?.trim() || null,
      rating: value.rating !== null && value.rating !== undefined
        ? Number(value.rating)
        : null,
    };
  }

  private resetForm(): void {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      oldPrice: null,
      category: '',
      rating: null,
    });

    this.isEditing.set(false);
    this.editingProductId.set(null);
  }

  private handleError(error: any): void {
    console.error('Admin product error:', error);

    this.isSaving.set(false);

    if (error.status === 401 || error.status === 403) {
      this.errorMessage.set('Δεν έχετε δικαίωμα για αυτή την ενέργεια.');
      return;
    }

    if (error.error?.validationErrors) {
      const validationMessages = Object.values(error.error.validationErrors).join(' ');
      this.errorMessage.set(validationMessages);
      return;
    }

    if (error.error?.message) {
      this.errorMessage.set(error.error.message);
      return;
    }

    this.errorMessage.set('Κάτι πήγε λάθος. Δοκιμάστε ξανά.');
  }
}