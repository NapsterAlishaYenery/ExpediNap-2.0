import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../ui/button/button';
import { IconsModule } from '../../../core/icons.module';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CreateOrderTransfer } from '../../../core/interfaces/orders/order-transfers/order-transfer.interface';
import { OrderTransferService } from '../../../core/services/orders-services/order-transfer/order-transfer.service';
import { AlertService } from '../../../core/services/alert/alert';
import { PhoneUtils } from '../../../core/utils/phone-utils';


@Component({
  selector: 'app-transfers-page',
  imports: [Button, IconsModule, ReactiveFormsModule],
  templateUrl: './transfers-page.html',
  styleUrl: './transfers-page.css',
})

export class TransfersPage {

  private fb = inject(FormBuilder);
  private orderTransferService = inject(OrderTransferService);
  private alertService = inject(AlertService);
  private readonly destroy$ = new Subject<void>(); // 3. Subject listo

  transferForm!: FormGroup;
  isLoading = false;
  isProcessing = false; // <<< Cambiado para ser igual a Excursions
  minDate: string; // <<< NUEVO: Restricción de fecha

  // ✅ AGREGAR después de las otras propiedades
  phoneUtils = PhoneUtils;

  constructor() {
    // Calculamos la fecha de mañana
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.transferForm = this.fb.group({
      transferType: ['airport-hotel', Validators.required],
      pickUpLocation: ['', Validators.required],
      destination: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numPassengers: [1, [Validators.required, Validators.min(1)]],
      pickUpDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        PhoneUtils.validatePhone // VALIDADOR DESDE EL UTIL
      ]],
      fullName: ['', Validators.required]
    });
  }

  onSubmit() {
    // Bloqueo de seguridad
    if (this.isProcessing) return;

    if (this.transferForm.valid) {
      // Solo bloqueamos si vamos a enviar de verdad
      this.isProcessing = true;

      // Aquí iría la llamada al servicio para enviar el correo o guardar en DB
      const formValues = this.transferForm.value;

      // ✅ AGREGAR esta línea:
      const cleanPhone = PhoneUtils.sanitizePhone(formValues.phone);

      // ✅ AGREGAR validación antes de enviar (opcional pero recomendado)
      if (!PhoneUtils.isValidPhone(cleanPhone)) {
        this.isProcessing = false;
        this.alertService.showAlert(
          'destructive',
          'Invalid Phone',
          'Phone number must have between 7 and 20 digits.'
        );
        return;
      }

      const newOrderTransfer: CreateOrderTransfer = {
        fullName: formValues.fullName,
        email: formValues.email,
        phone: cleanPhone,
        transferType: formValues.transferType,
        pickUpLocation: formValues.pickUpLocation,
        destination: formValues.destination,
        numPassengers: formValues.numPassengers,
        pickUpDate: formValues.pickUpDate,
        flightNumber: formValues.flightNumber,
        arrivalTime: formValues.arrivalTime
      }
      this.orderTransferService.createOrderTransfer(newOrderTransfer)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.isProcessing = false)) // <<< Esto limpia el estado siempre
        .subscribe({
          next: (response) => {
            this.alertService.showAlert(
              'success',
              'Order Transfer Submitted!',
              'Thank you for your order! Our team will review and contact you as soon as posible.'
            );
            // REESTABLECER CAMPOS: Todo vacío menos pasajeros en 1
            // ✅ Queda así:
            this.transferForm.reset({
              transferType: 'airport-hotel',
              numPassengers: 1,
              pickUpLocation: '',
              destination: '',
              flightNumber: '',
              pickUpDate: '',
              arrivalTime: '',
              email: '',
              fullName: ''
            });
          },
          error: (error) => {

            this.isLoading = false;
            // TAMBIÉN PODEMOS MOSTRAR UNA ALERTA DE ERROR
            this.alertService.showAlert(
              'destructive',
              'Submission Failed',
              `We could not save your order. Please try again later.${error}`
            );

          }
        });

    } else {
      // Marcar campos como tocados para mostrar errores
      this.transferForm.markAllAsTouched();
    }
  }

  // Dentro de la clase TransfersPage
  isInvalid(fieldName: string): boolean {
    const field = this.transferForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // 4. Limpieza por si acaso añades lógica de suscripción luego
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onWhatsAppQuery() {

    // Protección básica si se pulsa mientras se envía
    if (this.isProcessing) return;

    const orderTransfer = this.transferForm.value;
    const myPhone = '18098369303';

    // Si el cliente ya escribió algo, lo usamos. Si no, mandamos un saludo genérico.
    const pickup = orderTransfer.pickUpLocation ? orderTransfer.pickUpLocation.toUpperCase() : 'PENDING';
    const destiny = orderTransfer.destination ? orderTransfer.destination.toUpperCase() : 'PENDING';
    const pax = orderTransfer.numPassengers || '1';

    const message = `*INFORMATION REQUEST - TRANSFERS*
---------------------------------------
*HELLO EXPEDINAP, I NEED A QUOTE FOR A TRANSFER:*
*TYPE:* ${orderTransfer.transferType.toUpperCase()}
*ORIGIN:* ${pickup}
*DESTINATION:* ${destiny}
*PASSENGERS:* ${pax}
---------------------------------------
WHAT WOULD BE THE PRICE FOR THIS ROUTE?`;

    const url = `https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  // ✅ NUEVO MÉTODO: Reservar por WhatsApp (sin guardar en backend)
  onWhatsAppBooking() {
    // Validar que el formulario sea válido antes de enviar
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      this.alertService.showAlert(
        'destructive',
        'Incomplete Form',
        'Please fill in all required fields before booking.'
      );
      return;
    }

    if (this.isProcessing) return;

    this.isProcessing = true;

    const formValues = this.transferForm.value;
    const myPhone = '18098369303';

    // Formatear fecha más legible
    const formattedDate = formValues.pickUpDate
      ? new Date(formValues.pickUpDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      : 'PENDING';

    // Tipos de transferencia en español para el mensaje
    const transferTypes: { [key: string]: string } = {
      'airport-hotel': '✈️ Airport → Hotel',
      'hotel-airport': '🏨 Hotel → Airport',
      'round-trip': '🔄 Round Trip (Ida y Vuelta)',
      'hotel-hotel': '🏨 Hotel → Hotel',
      'country': '🇩🇴 Interior del País'
    };

    const message = `*🆕 NEW TRANSFER BOOKING - EXPEDINAP*
━━━━━━━━━━━━━━━━━━━━━━━━━━━

*👤 CLIENT INFORMATION:*
• *Name:* ${formValues.fullName?.toUpperCase() || 'PENDING'}
• *Email:* ${formValues.email || 'PENDING'}
• *Phone:* ${formValues.phone || 'PENDING'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🚐 TRANSFER DETAILS:*
• *Type:* ${transferTypes[formValues.transferType] || formValues.transferType}
• *From:* ${formValues.pickUpLocation?.toUpperCase() || 'PENDING'}
• *To:* ${formValues.destination?.toUpperCase() || 'PENDING'}
• *Passengers:* ${formValues.numPassengers || '1'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

*✈️ FLIGHT INFORMATION:*
• *Flight #:* ${formValues.flightNumber?.toUpperCase() || 'PENDING'}
• *Date:* ${formattedDate}
• *Arrival Time:* ${formValues.arrivalTime || 'PENDING'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

*💬 NOTES:*
Payment upon collection. Driver will be waiting with a sign.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Please confirm availability and total price.* 🙏`;

    const url = `https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Opcional: Mostrar un mensaje de éxito
    this.alertService.showAlert(
      'success',
      'Booking Request Sent!',
      'You will be redirected to WhatsApp to confirm your transfer.'
    );

    this.isProcessing = false;
  }
}
