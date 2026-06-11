import { OrderItem } from './order-item';

export interface Order {
  id: number;
  userId: number;
  username: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
}