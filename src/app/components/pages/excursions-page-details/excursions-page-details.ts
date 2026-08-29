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
import { OrderExcursionService } from '../../../core/services/orders-services/order-excursion/order-excursion.service';
import { AlertService } from '../../../core/services/alert/alert';
import { PhoneUtils } from '../../../core/utils/phone-utils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-excursions-page-details',
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb, ImageGallery, Button, IconsModule],
  templateUrl: './excursions-page-details.html',
  styleUrl: './excursions-page-details.css',
})
export class ExcursionsPageDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private excursionService = inject(ExcursionService);
  private orderService = inject(OrderExcursionService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  private titleService = inject(Title);      // ✅ Para metadatos
  private metaService = inject(Meta);        // ✅ Para metadatos

  private readonly destroy$ = new Subject<void>();

  excursion?: ExcursionResponse;
  bookingForm: FormGroup;
  isLoading = true;
  minDate: string;
  isProcessing = false;

  // ✅ EXPONER PhoneUtils al template
  phoneUtils = PhoneUtils;

  constructor() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        PhoneUtils.validatePhone // ✅ VALIDADOR DESDE EL UTIL
      ]],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      travelDate: ['', Validators.required],
      hotelName: [''],
      hotelNumber: [''],
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.excursionService.getExcursionBySlug(slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.excursion = res.data;
            this.isLoading = false;

            this.updateMetadata();
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });
    }
  }

  // 🔥 NUEVO: Método para actualizar metadatos
  private updateMetadata(): void {
    if (!this.excursion) return;

    const excursionName = this.excursion.name;
    const location = this.excursion.location?.locationName || 'Punta Cana';
    const duration = this.excursion.duration?.value || '';
    const durationUnit = this.excursion.duration?.unit || 'hours';

    // 🔥 Título - Usar SEO title de la base de datos o generar uno
    const seoTitle = this.excursion.seo?.title ||
      `${excursionName} | Best Excursion in ${location} | ExpediNap`;

    // 🔥 Meta description - Usar SEO description de la base de datos o generar una
    const seoDescription = this.excursion.seo?.description ||
      `Book the ${excursionName} excursion in ${location}. Duration: ${duration} ${durationUnit}. Experience the best of Punta Cana with ExpediNap. Secure booking and best price guaranteed.`;

    // 🔥 Keywords - Usar SEO keywords de la base de datos o generar
    const seoKeywords = this.excursion.seo?.keywords?.length
      ? this.excursion.seo.keywords.join(', ')
      : `${excursionName}, excursions ${location}, Punta Cana tours, Dominican Republic adventures, ${location} excursions, ExpediNap, ${duration} hour tour`;

    this.titleService.setTitle(seoTitle);

    this.metaService.updateTag({
      name: 'description',
      content: seoDescription
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: seoKeywords
    });

    // 🔥 Open Graph (para compartir en redes)
    this.metaService.updateTag({
      property: 'og:title',
      content: seoTitle
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: seoDescription
    });

    // 🔥 Imagen dinámica - usa la imagen principal de la excursión
    if (this.excursion.images && this.excursion.images.main) {
      this.metaService.updateTag({
        property: 'og:image',
        content: this.excursion.images.main.url
      });
    }

    this.metaService.updateTag({
      property: 'og:url',
      content: `https://www.expedinap.com/excursions/${this.excursion.slug}`
    });
  }

  onBookDirect() {
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();

      let errorMessage = 'Please complete all required fields: ';
      const errors = [];

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

      if (this.bookingForm.get('adults')?.invalid) errors.push('Adults (minimum 1)');
      if (this.bookingForm.get('travelDate')?.invalid) errors.push('Travel Date');

      this.alertService.showAlert(
        'destructive',
        'Validation Error',
        errors.length > 0 ? errorMessage + errors.join(', ') : 'Please complete all required fields.'
      );
      return;
    }

    if (!this.excursion) {
      this.alertService.showAlert(
        'destructive',
        'Error',
        'Excursion data not loaded. Please refresh the page.'
      );
      return;
    }

    this.isProcessing = true;

    const formValue = this.bookingForm.value;

    // ✅ Usar PhoneUtils.sanitizePhone
    const cleanPhone = PhoneUtils.sanitizePhone(formValue.phone);

    // ✅ Usar PhoneUtils.isValidPhone
    if (!PhoneUtils.isValidPhone(cleanPhone)) {
      this.isProcessing = false;
      this.alertService.showAlert(
        'destructive',
        'Invalid Phone',
        'Phone number must have between 7 and 20 digits.'
      );
      return;
    }

    const orderData = {
      excursionId: this.excursion._id,
      fullName: formValue.fullName.trim(),
      email: formValue.email.trim(),
      phone: cleanPhone, // ✅ Ya sanitizado
      adults: Number(formValue.adults),
      children: Number(formValue.children) || 0,
      travelDate: formValue.travelDate,
      hotelName: formValue.hotelName?.trim() || undefined,
      hotelNumber: formValue.hotelNumber?.trim() || undefined
    };

    this.orderService.createOrderExcursion(orderData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isProcessing = false;

          if (response.ok) {
            this.alertService.showAlert(
              'success',
              'Booking Confirmed! 🎉',
              `Your reservation #${response.data.orderNumber} has been created successfully. You will receive a confirmation email with payment instructions.`
            );

            this.bookingForm.reset({
              adults: 1,
              children: 0
            });

            this.bookingForm.markAsPristine();
            this.bookingForm.markAsUntouched();
          } else {
            this.alertService.showAlert(
              'destructive',
              'Booking Failed',
              response.message || 'Could not create your booking. Please try again.'
            );
          }
        },
        error: (error) => {
          this.isProcessing = false;
          console.error('Error creating order:', error);

          let errorMessage = 'An error occurred while creating your booking.';

          if (error.error?.type === 'INVALID_DATE') {
            errorMessage = 'Invalid travel date. Bookings must be made at least 24 hours in advance.';
          } else if (error.error?.type === 'NOT_FOUND') {
            errorMessage = 'Selected excursion not found. Please refresh the page.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }

          this.alertService.showAlert(
            'destructive',
            'Error',
            errorMessage
          );
        }
      });
  }

  onWhatsApp() {
    if (this.isProcessing) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();

      const phoneControl = this.bookingForm.get('phone');
      if (phoneControl?.invalid) {
        if (phoneControl.errors?.['minDigits']) {
          this.alertService.showAlert(
            'destructive',
            'Invalid Phone',
            'Please enter at least 7 digits for the phone number.'
          );
          return;
        } else if (phoneControl.errors?.['maxDigits']) {
          this.alertService.showAlert(
            'destructive',
            'Invalid Phone',
            'Please enter maximum 20 digits for the phone number.'
          );
          return;
        }
      }
      this.alertService.showAlert(
        'destructive',
        'Validation Error',
        'Please complete all fields.'
      );
      return;
    }

    const orderExcursionForm = this.bookingForm.value;
    const myPhone = '18098369303';

    // ✅ Usar pricing.adultPrice
    const adultPrice = this.excursion?.pricing?.adultPrice || 0;

    const message = `*EXCURSION REQUEST - EXPEDINAP*
---------------------------------------
*EXCURSION:* ${this.excursion?.name?.toUpperCase()}
*CLIENT:* ${orderExcursionForm.fullName.toUpperCase()}
*PHONE:* ${orderExcursionForm.phone}
*DATE:* ${orderExcursionForm.travelDate}
*ADULTS:* ${orderExcursionForm.adults}
*CHILDREN:* ${orderExcursionForm.children || 0}
---------------------------------------
*EXCURSION PRICE :* $${adultPrice} USD
---------------------------------------
I WOULD LIKE TO CONFIRM AVAILABILITY AND PAYMENT STEPS.`;

    const url = `https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}