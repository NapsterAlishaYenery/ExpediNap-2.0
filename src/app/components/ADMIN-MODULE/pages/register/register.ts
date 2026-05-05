import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconsModule } from '../../../../core/icons.module';
import { Button } from '../../../ui/button/button';
import { UsersService } from '../../../../core/services/users/users.service';
import { AlertService } from '../../../../core/services/alert/alert';
import { RegisterRequest } from '../../../../core/interfaces/user/user.interface';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, IconsModule, RouterModule, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [''],
    age: [null, [Validators.min(18)]],
    direction: this.fb.group({
      street: [''],
      city: [''],
      municipality: [''],
      zip_code: ['']
    })
  });

  isSubmitting = false;

  onSubmit() {
  // 1. Validamos el formulario
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    this.alertService.showAlert('destructive', 'Form Incomplete', 'Please check the required fields.');
    return;
  }

  this.isSubmitting = true;

  // 2. Construimos el objeto manualmente propiedad por propiedad
  // Esto es lo que el backend espera recibir (RegisterRequest)
  const formValues = this.registerForm.value;
  
  const registerData: RegisterRequest = {
    name:      formValues.name,
    lastname:  formValues.lastname,
    username:  formValues.username,
    email:     formValues.email,
    password:  formValues.password,
    phone:     formValues.phone,
    age:       formValues.age,
    // La dirección es un objeto anidado, lo asignamos también paso a paso
    direction: {
      street:       formValues.direction.street,
      city:         formValues.direction.city,
      municipality: formValues.direction.municipality,
      zip_code:     formValues.direction.zip_code
    }
  };

  // 3. Enviamos al servicio
  this.usersService.register(registerData).subscribe({
    next: (res) => {
      this.alertService.showAlert('success', 'User Created', 'The administrator account was registered successfully.');
      
      // Limpiamos el formulario
      this.registerForm.reset();
      
      // Redirigimos al login (o a donde prefieras)
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.isSubmitting = false;
      const msg = err.error?.message || 'Error creating user';
      this.alertService.showAlert('destructive', 'Error', msg);
    }
  });
}
  
  // Helper para validaciones en el HTML
  isValidField(field: string): boolean | null {
    return this.registerForm.get(field)!.touched && this.registerForm.get(field)!.invalid;
  }

}
