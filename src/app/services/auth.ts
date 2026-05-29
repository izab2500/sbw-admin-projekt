import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly loginUrl = "http://localhost:5000/api/v1/auth/admin/login";
  private readonly logoutUrl = "http://localhost:5000/api/v1/auth/admin/logout";

  loginAdmin(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, payload, {
      withCredentials: true
    })

  }

  logoutAdmin(): Observable<any> {
    return this.http.post(this.logoutUrl,{}, {
      withCredentials: true
    })
  }
}
