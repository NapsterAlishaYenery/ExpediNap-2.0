import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../ui/breadcrumb/breadcrumb';
import { ImageGallery } from '../../ui/image-gallery/image-gallery';
import { Button } from '../../ui/button/button';
import { IconsModule } from '../../../core/icons.module';
import { OrderYachtService } from '../../../core/services/orders-services/order-yacht/order-yacht.service';
import { AlertService } from '../../../core/services/alert/alert';
import { CreateOrderYacht } from '../../../core/interfaces/orders/order-yachts/order-yacht.interface';

@Component({
  selector: 'app-yachts-page-details',
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb, ImageGallery, Button, IconsModule],
  templateUrl: './yachts-page-details.html',
  styleUrl: './yachts-page-details.css',
})
export class YachtsPageDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private yachtService = inject(YachtService);
  private orderYacht = inject(OrderYachtService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  yacht?: YachtResponse;
  bookingForm: FormGroup;
  isLoading = true;
  isProcessing = false; // <<< NUEVO: Para control de doble click
  selectedPrice: number = 0;
  minDate: string;

  constructor() {

    const tomorrow = new Date();
    // Sumamos 1 día (24 horas)
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Formateamos a YYYY-MM-DD que es lo que entiende el input date
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonePrefix: ['+1'],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      destination: ['Saona Island', Validators.required],
      duration: ['Full Day', Validators.required],
      travelDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug ) {
      this.yachtService.getYachtBySlug(slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.yacht = res.data;
            this.updatePrice();
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });
    }

    this.bookingForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updatePrice());
  }

  // Método nuevo para controlar el UI
  shouldShowHalfDay(): boolean {
    const dest = this.bookingForm.get('destination')?.value;
    if (dest === 'Saona Island') return !!this.yacht?.saonaPrice?.halfDay;
    if (dest === 'Catalina Island') return !!this.yacht?.catalinaPrice?.halfDay;
    return false;
  }

  updatePrice() {
    // 1. Verificamos que el yate exista
    if (!this.yacht) return;

    const { destination, duration } = this.bookingForm.value;

    // Lógica idéntica a la del Backend para que el usuario vea lo mismo que se cobrará
    if (destination === 'River Sunset') {
      this.selectedPrice = this.yacht.riverSunset?.price ?? 0;
      // Forzamos la duración a Half Day internamente si es Sunset
      if (duration !== 'Half Day') {
        this.bookingForm.get('duration')?.setValue('Half Day', { emitEvent: false });
      }
    } else {
      const prices = destination === 'Saona Island' ? this.yacht.saonaPrice : this.yacht.catalinaPrice;
      if (prices) {
        this.selectedPrice = duration === 'Half Day' ? (prices.halfDay ?? 0) : (prices.fullDay ?? 0);
      } else {
        this.selectedPrice = 0;
      }
    }
  }

  onReserveAndWhatsApp() {
    // <<< CAMBIO: Si ya se está enviando, bloqueamos la ejecución
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true; // Bloquea el botón
    const formValues = this.bookingForm.value;

    if (this.yacht?._id) {
      // Unificamos teléfono quitando cualquier cosa que no sea número
      const fullPhone = (formValues.phonePrefix + formValues.phone).replace(/\D/g, '');

      const newOrderYacht: CreateOrderYacht = {
        yachtId: this.yacht._id,
        fullName: formValues.fullName,
        email: formValues.email,
        phone: fullPhone,
        destination: formValues.destination,
        duration: formValues.duration,
        travelDate: formValues.travelDate
      };

      // 1. Guardamos en la base de datos
      this.orderYacht.createOrderExcursion(newOrderYacht)
        .pipe(
          takeUntil(this.destroy$),
          // finalize garantiza que el botón se reactive siempre
          finalize(() => this.isProcessing = false)
        )
        .subscribe({
          next: (res) => {
            // 2. Abrimos WhatsApp automáticamente
            this.openWhatsApp(formValues);

            // 3. Mostramos la alerta de éxito
            this.alertService.showAlert(
              'success',
              'YACHT RESERVATION SENT!',
              'THANK YOU! WE HAVE SAVED YOUR REQUEST AND OPENED WHATSAPP TO FINALIZE DETAILS.'
            );

            // 4. Reiniciamos el formulario
            this.bookingForm.reset({
              destination: 'Saona Island',
              duration: 'Full Day',
              phonePrefix: '+1'
            });
          },
          error: (err) => {
            console.error(err);
            this.alertService.showAlert(
              'destructive',
              'SUBMISSION FAILED',
              'WE COULD NOT SAVE YOUR ORDER. PLEASE TRY AGAIN OR CONTACT US DIRECTLY.'
            );
          }
        });
    }
  }

  // Método privado de apoyo para limpiar el código
  private openWhatsApp(orderYacht: any) {
    const myPhone = '18098369303';
    const message = `*YACHT RESERVATION - EXPEDINAP*
---------------------------------------
*YACHT:* ${this.yacht?.name?.toUpperCase()}
*DESTINATION:* ${orderYacht.destination.toUpperCase()}
*DURATION:* ${orderYacht.duration.toUpperCase()}
*DATE:* ${orderYacht.travelDate}
*CLIENT:* ${orderYacht.fullName.toUpperCase()}
*PHONE:* ${orderYacht.phonePrefix} ${orderYacht.phone}
*ESTIMATED PRICE:* $${this.selectedPrice} USD
---------------------------------------
I just sent my request through the website. Please confirm availability.`;

    window.open(`https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
