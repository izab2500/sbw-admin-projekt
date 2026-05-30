import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenuItem } from '../models/imenu-item';

@Injectable({
  providedIn: 'root',
})

export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:5000/api/v1/menu";

  getMenuItems(): Observable<any> {
    return this.http.get(this.apiUrl, {
      withCredentials: true
    });
  }

  getMenuItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  createMenuItem(payload:IMenuItem): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      withCredentials: true
    });
  }

  updateMenuItemById(id: string, payload:IMenuItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload, {
      withCredentials: true
    });
  }

  deleteMenuItemById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
}
