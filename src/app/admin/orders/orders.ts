import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  private readonly orderService = inject(OrderService);

   orders = signal<any[]>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders.set(res.data ?? []);
      },
      error: (err) => {
        console.error('Kunde inte hämta beställningar:', err);
      }
    });
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error(err)
    });
  }

  updateStatus(id: string, event:Event): void {
    const value = (event.target as HTMLSelectElement).value
    console.log("uppdatera staus", value)
    this.orderService.updateOrderStatus(id, { status:value }).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error(err)
    });
  }
}
