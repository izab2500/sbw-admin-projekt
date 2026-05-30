import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  numOfMenuItems = signal<number>(0);
  menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response) => {
        this.numOfMenuItems.set(response.data.length);
        console.log("Meny:", response.message);
      },
      error: (err) => {
        console.error("Fel:", err);
      }
    });
  }
}
