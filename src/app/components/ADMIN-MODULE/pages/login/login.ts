import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';
import { Auth } from '../../../../core/services/auth/auth';
import { AlertService } from '../../../../core/services/alert/alert';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../core/icons.module';
import { Button } from '../../../ui/button/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, IconsModule, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private authService = inject(Auth);
  private alertService = inject(AlertService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  isLoading = false;
  showPassword = false;

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // 1. Extraemos los datos paso a paso
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };

    // 2. Llamamos al servicio
    this.usersService.login(loginData.username, loginData.password).subscribe({
      next: (response) => {
        if (response.ok) {
         
          this.authService.saveCurrentUser(response.data.user);

          this.alertService.showAlert('success', 'Welcome back', response.message);

          // 4. Redirigimos al Home o a un Dashboard
          this.router.navigate(['/admin/dashboard-home']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.message || 'Invalid credentials';
        this.alertService.showAlert('destructive', 'Auth Error', errorMsg);
      }
    });
  }

  // Helper para feedback visual en el HTML
  isValidField(field: string): boolean | null {
    return this.loginForm.get(field)!.touched && this.loginForm.get(field)!.invalid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
