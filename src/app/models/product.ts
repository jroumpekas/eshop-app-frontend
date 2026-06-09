export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;

  // Frontend-only προς το παρόν
  imageUrl?: string;
  oldPrice?: number;
  category?: string;
  rating?: number;
}