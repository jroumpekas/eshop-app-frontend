import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutRequest } from '../models/checkout-request';
import { Order } from '../models/order';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);

  readonly apiUrl = `${environment.apiUrl}/orders`;

  checkout(request: CheckoutRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/checkout`, request);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }
}