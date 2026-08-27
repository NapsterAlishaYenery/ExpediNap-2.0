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
import { PhoneUtils } from '../../../core/utils/phone-utils';

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
  isProcessing = false;
  selectedPrice: number = 0;
  minDate: string;

  // ✅ EXPONER PhoneUtils al template
  phoneUtils = PhoneUtils;

  constructor() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        PhoneUtils.validatePhone
      ]],
      destination: ['Saona Island', Validators.required],
      duration: ['Full Day', Validators.required],
      travelDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
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

  shouldShowHalfDay(): boolean {
    const dest = this.bookingForm.get('destination')?.value;
    if (dest === 'Saona Island') return !!this.yacht?.saonaPrice?.halfDay;
    if (dest === 'Catalina Island') return !!this.yacht?.catalinaPrice?.halfDay;
    return false;
  }

  updatePrice() {
    if (!this.yacht) return;

    const { destination, duration } = this.bookingForm.value;

    if (destination === 'River Sunset') {
      this.selectedPrice = this.yacht.riverSunset?.price ?? 0;
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

  // ✅ MÉTODO 1: BOOK NOW - Guarda en BD y abre WhatsApp
  // ✅ MÉTODO 1: BOOK NOW - Solo guarda en BD (NO abre WhatsApp)
  onBookNow() {
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();

      let errorMessage = 'Please complete all required fields: ';
      const errors = [];

      if (this.bookingForm.get('destination')?.invalid) errors.push('Destination');
      if (this.bookingForm.get('duration')?.invalid) errors.push('Duration');
      if (this.bookingForm.get('travelDate')?.invalid) errors.push('Travel Date');
      if (this.bookingForm.get('fullName')?.invalid) errors.push('Full Name');
      if (this.bookingForm.get('email')?.invalid) errors.push('Email');

      const phoneControl = this.bookingForm.get('phone');
      if (phoneControl?.invalid) {
        if (phoneControl.errors?.['minDigits']) {
          errors.push('Phone (minimum 7 digits)');
        } else if (phoneControl.errors?.['maxDigits']) {
          errors.push('Phone (maximum 20 digits)');
        } else {
          errors.push('Phone');
        }
      }

      this.alertService.showAlert(
        'destructive',
        'Validation Error',
        errors.length > 0 ? errorMessage + errors.join(', ') : 'Please complete all required fields.'
      );
      return;
    }

    if (!this.yacht) {
      this.alertService.showAlert(
        'destructive',
        'Error',
        'Yacht data not loaded. Please refresh the page.'
      );
      return;
    }

    this.isProcessing = true;
    const formValues = this.bookingForm.value;
    const cleanPhone = PhoneUtils.sanitizePhone(formValues.phone);

    if (!PhoneUtils.isValidPhone(cleanPhone)) {
      this.isProcessing = false;
      this.alertService.showAlert(
        'destructive',
        'Invalid Phone',
        'Phone number must have between 7 and 20 digits.'
      );
      return;
    }

    const newOrderYacht: CreateOrderYacht = {
      yachtId: this.yacht._id,
      fullName: formValues.fullName,
      email: formValues.email,
      phone: cleanPhone,
      destination: formValues.destination,
      duration: formValues.duration,
      travelDate: formValues.travelDate
    };

    this.orderYacht.createOrderYacht(newOrderYacht)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isProcessing = false)
      )
      .subscribe({
        next: (res) => {
          // ❌ ELIMINAR esta línea:
          // this.openWhatsApp(formValues);

          // ✅ Mostrar solo la alerta de éxito
          this.alertService.showAlert(
            'success',
            'YACHT RESERVATION CONFIRMED! 🎉',
            `Your reservation #${res.data.orderNumber} has been created successfully. You will receive a confirmation email with payment instructions.`
          );

          this.bookingForm.reset({
            destination: 'Saona Island',
            duration: 'Full Day',
          });
        },
        error: (err) => {
          console.error(err);
          this.alertService.showAlert(
            'destructive',
            'SUBMISSION FAILED',
            'We could not save your order. Please try again or contact us directly.'
          );
        }
      });
  }
  // ✅ MÉTODO 2: BOOK ON WHATSAPP - Solo abre WhatsApp sin guardar
  onBookOnWhatsApp() {
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();

      const phoneControl = this.bookingForm.get('phone');
      if (phoneControl?.invalid) {
        if (phoneControl.errors?.['minDigits']) {
          this.alertService.showAlert(
            'destructive',
            'Validation Error',
            'Phone number must have at least 7 digits.'
          );
          return;
        } else if (phoneControl.errors?.['maxDigits']) {
          this.alertService.showAlert(
            'destructive',
            'Validation Error',
            'Phone number must have maximum 20 digits.'
          );
          return;
        }
      }

      this.alertService.showAlert(
        'destructive',
        'Validation Error',
        'Please complete all required fields before booking on WhatsApp.'
      );
      return;
    }

    const formValues = this.bookingForm.value;
    this.openWhatsApp(formValues);

    this.alertService.showAlert(
      'success',
      'WhatsApp Opened!',
      'You will be redirected to WhatsApp to confirm your yacht booking.'
    );
  }

  // Método privado para abrir WhatsApp con los datos del formulario
  private openWhatsApp(orderYacht: any) {
    const myPhone = '18098369303';
    const message = `*YACHT RESERVATION - EXPEDINAP*
---------------------------------------
*YACHT:* ${this.yacht?.name?.toUpperCase()}
*DESTINATION:* ${orderYacht.destination.toUpperCase()}
*DURATION:* ${orderYacht.duration.toUpperCase()}
*DATE:* ${orderYacht.travelDate}
*CLIENT:* ${orderYacht.fullName.toUpperCase()}
*PHONE:* ${orderYacht.phone}
*EMAIL:* ${orderYacht.email}
*ESTIMATED PRICE:* $${this.selectedPrice} USD
---------------------------------------
I would like to confirm availability for this yacht booking.`;

    window.open(`https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}