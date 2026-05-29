import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  const http = inject(HttpClient);
  const apiUrl = "http://localhost:5000/api/v1/auth/admin/me";

  return new Promise<boolean>((resolve) => {
    http.get<any>(apiUrl, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response?.success) {
            resolve(true);
          } else {
            router.navigateByUrl('/admin/logga-in');
            resolve(false);
          }
        },
        error: () => {
          router.navigateByUrl('/admin/logga-in');
          resolve(false);
        }
      });
  });

};
