import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:5000/api/v1/auth/admin/login";

  loginAdmin(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      withCredentials: true

    })

  }
}
