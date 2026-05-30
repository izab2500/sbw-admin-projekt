import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private readonly menuService = inject(MenuService);

  menuItems = signal<any[]>([]);
  isEditMode = signal(false);
  selectedItemId = signal<string | null>(null);

  menuForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    heading: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    category: new FormControl('sushi', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (res) => {
        this.menuItems.set(res.data);
      },
      error: (err) => console.error(err)
    });
  }

  submit(): void {
    if (this.isEditMode()) {
      this.updateItem();
    } else {
      this.createItem();
    }
  }

  createItem(): void {
    this.menuService.createMenuItem(this.menuForm.value as any).subscribe({
      next: () => {
        this.resetForm();
        this.loadMenuItems();
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(item: any): void {
    this.isEditMode.set(true);
    this.selectedItemId.set(item._id);

    this.menuForm.setValue({
      image: item.image,
      heading: item.heading,
      description: item.description,
      price: item.price,
      category: item.category
    });

    document.querySelector('.menu-form-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  updateItem(): void {
    const id = this.selectedItemId();
    if (!id) return;
    this.menuService.updateMenuItemById(id, this.menuForm.value as any).subscribe({
      next: () => {
        this.resetForm();
        this.loadMenuItems();
      },
      error: (err) => console.error(err)
    });
  }

  deleteItem(id: string): void {
    this.menuService.deleteMenuItemById(id).subscribe({
      next: () => this.loadMenuItems(),
      error: (err) => console.error(err)
    });
  }

  cancelEdit(): void {
    this.resetForm()
  }

  resetForm(): void {
    this.isEditMode.set(false);
    this.selectedItemId.set(null);
    this.menuForm.reset({
      image: '',
      heading: '',
      description: '',
      price: 0,
      category: 'sushi'
    });
  }
}
