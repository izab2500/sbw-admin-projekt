import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  numOfMenuItems = signal<number>(0);
  menuService = inject(MenuService);

  orderService = inject(OrderService);
  numOfOrders = signal<number>(0);


  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response) => {
        this.numOfMenuItems.set(response.data?.length ?? 0);
        console.log("Meny:", response.message);
      },
      error: (err) => {
        console.error("Fel:", err);
      }
    });

    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.numOfOrders.set(response.data?.length ?? 0);
        console.log("Beställningar:", response.message);
      },
      error: (err) => {
        console.error("Fel:", err);
      }
    });
  }

}

