import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { UsersService } from '../../../../core/services/users/users.service';
import { AlertService } from '../../../../core/services/alert/alert';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../core/icons.module';
import { Button } from '../../../ui/button/button';

@Component({
  selector: 'app-recuperar-password',
  imports: [ReactiveFormsModule, CommonModule, IconsModule, Button, RouterLink],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.css',
})
export class RecuperarPassword {
private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  // 1. Subject para limpiar suscripciones
  private readonly destroy$ = new Subject<void>();

  step: 'request' | 'verify' | 'reset' = 'request';
  isLoading = false;
  
  timeLeft: number = 300;
  timerDisplay: string = '05:00';
  timerSubscription?: Subscription;

  requestForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  resetForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { 
    validators: (group: FormGroup) => {
      const pass = group.get('newPassword')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { notSame: true };
    }
  });

  ngOnDestroy(): void {
    // 2. Ejecutar limpieza
    this.destroy$.next();
    this.destroy$.complete();
    this.stopTimer();
  }

  onRequestCode() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const email = this.requestForm.value.email;

    this.usersService.passwordRequestResetCode(email)
      .pipe(takeUntil(this.destroy$)) // Evita fugas
      .subscribe({
        next: (res) => {
          if (res.ok) {
            this.alertService.showAlert('success', 'Code Sent', res.message);
            this.step = 'verify';
            this.startTimer();
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          const msg = err.error?.message || 'Error sending code';
          this.alertService.showAlert('destructive', 'Error', msg);
        }
      });
  }

  onResetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const data = {
      email: this.requestForm.value.email,
      code: this.resetForm.value.code,
      newPassword: this.resetForm.value.newPassword
    };

    this.usersService.resetPassword(data)
      .pipe(takeUntil(this.destroy$)) // Evita fugas
      .subscribe({
        next: (res) => {
          if (res.ok) {
            this.alertService.showAlert('success', 'Success', res.message);
            this.stopTimer();
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          const msg = err.error?.message || 'Invalid code or expired';
          this.alertService.showAlert('destructive', 'Error', msg);
        }
      });
  }

  startTimer() {
    this.stopTimer();
    this.timeLeft = 300;
    this.timerSubscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          const mins = Math.floor(this.timeLeft / 60);
          const secs = this.timeLeft % 60;
          this.timerDisplay = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
          this.stopTimer();
          this.alertService.showAlert('destructive', 'Expired', 'The code has expired.');
          this.goToStep('request');
        }
      });
  }

  stopTimer() {
    this.timerSubscription?.unsubscribe();
  }

  goToStep(target: 'request' | 'verify' | 'reset') {
    this.step = target;
    if (target === 'request') {
        this.stopTimer();
        this.resetForm.reset();
    }
  }

  isValidField(form: FormGroup, field: string): boolean | null {
    return form.get(field)!.touched && form.get(field)!.invalid;
  }
}
