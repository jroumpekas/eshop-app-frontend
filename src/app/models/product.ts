export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  imageUrl?: string | null;
  oldPrice?: number | null;
  category?: string | null;
  rating?: number | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}