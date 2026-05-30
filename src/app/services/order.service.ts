import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/v1/orders';

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl, {
      withCredentials: true
    })

  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      withCredentials: true
    })
  }

  updateOrderStatus(id: string, payload: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, payload, {
      withCredentials: true
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
}
