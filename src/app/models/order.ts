import { OrderItem } from './order-item';

export interface Order {
  id: string;
  userId: number;
  username: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
}