import { Component, inject} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  logoutAdmin() {
    this.authService.logoutAdmin().subscribe({
      next: (res) => {
        console.log('Logga ut:', res.message);
        this.router.navigateByUrl('/admin/logga-in');
      },
      error: (err) => {
        console.error('Logout error:', err.error?.message);
      }
    });
  }
}
