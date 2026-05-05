import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcursionService } from '../../../core/services/excursios/excursion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExcursionResponse } from '../../../core/interfaces/excursion/excursion.interface';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../ui/breadcrumb/breadcrumb';
import { ImageGallery } from '../../ui/image-gallery/image-gallery';
import { Button } from '../../ui/button/button';
import { IconsModule } from '../../../core/icons.module';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-excursions-page-details',
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb, ImageGallery, Button, IconsModule],
  templateUrl: './excursions-page-details.html',
  styleUrl: './excursions-page-details.css',
})
export class ExcursionsPageDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private excursionService = inject(ExcursionService);
  private fb = inject(FormBuilder);

  private readonly destroy$ = new Subject<void>(); // 4. El "semáforo" de cierre

  excursion?: ExcursionResponse;
  bookingForm: FormGroup;
  isLoading = true;
  minDate: string;

  // ESTADOS NUEVOS
  isProcessing = false;


  constructor() {

    const tomorrow = new Date();
    // Sumamos 1 día (24 horas)
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Formateamos a YYYY-MM-DD que es lo que entiende el input date
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      phonePrefix: ['+1'],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      travelDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.excursionService.getExcursionBySlug(slug)
        .pipe(takeUntil(this.destroy$)) // 5. Vincular al ciclo de vida
        .subscribe({
          next: (res) => {
            this.excursion = res.data;
            this.isLoading = false;
            // Una vez cargada la excursión, inicializamos PayPal
            // INICIALIZAMOS PAYPAL DESPUÉS DE CARGAR LOS DATOS


          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });
    }
  }


  onWhatsApp() {
    // También añadimos la protección de isProcessing aquí
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      alert('PLEASE COMPLETE ALL FIELDS.');
      return;
    }

    const orderExcursionForm = this.bookingForm.value;
    const myPhone = '18098369303';

    // Mensaje limpio y profesional pegado a la izquierda
    const message = `*EXCURSION REQUEST - EXPEDINAP*
---------------------------------------
*EXCURSION:* ${this.excursion?.name?.toUpperCase()}
*CLIENT:* ${orderExcursionForm.fullName.toUpperCase()}
*PHONE:* ${orderExcursionForm.phonePrefix} ${orderExcursionForm.phone}
*DATE:* ${orderExcursionForm.travelDate}
---------------------------------------
*EXCURSION PRICE :* $${this.excursion?.offerPriceUsd} USD
---------------------------------------
I WOULD LIKE TO CONFIRM AVAILABILITY AND PAYMENT STEPS.`;

    const url = `https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  // 6. Limpieza al salir
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
