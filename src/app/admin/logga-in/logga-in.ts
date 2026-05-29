import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logga-in',
  imports: [ReactiveFormsModule],
  templateUrl: './logga-in.html',
  styleUrl: './logga-in.css',
})

export class LoggaIn {
  private authService = inject(Auth);
  private router = inject(Router);

  responseMessage = signal<string>("");

  adminForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/.+@.+\..{2,}/)
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  login() {
    if (this.adminForm.invalid) return;
    const payload = {
      email: this.adminForm.controls.email.value!,
      password: this.adminForm.controls.password.value!
    };

    this.authService.loginAdmin(payload).subscribe({
      next: (res: any) => {
        this.responseMessage.set(res.message);
        this.adminForm.reset();
        this.router.navigateByUrl("/admin");
        setTimeout(() => {
          this.responseMessage.set("");
        }, 5000);
      },
      error: (err) => {
        this.responseMessage.set(err.error?.message || "Fel vid inloggning");

        setTimeout(() => {
          this.responseMessage.set("");
        }, 5000);
      }
    });
  }
}
