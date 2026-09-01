import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../../ui/button/button';
import { AlertService } from '../../../core/services/alert/alert';
import { EmailSenderService } from '../../../core/services/email-sender/email-sender.service';
import { EmailSenderBase } from '../../../core/interfaces/contact-email/email.interface';
import { finalize, Subject, takeUntil } from 'rxjs';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, Button, IconsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  contactoForm: FormGroup;
  isProcessing = false; // <<< Cambiado para consistencia global
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private emailSenderService = inject(EmailSenderService);
  private seoService = inject(SeoService);

  constructor() {
    this.contactoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9+ ]*$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // ✅ Configuración SEO para la página de Contacto
    this.seoService.setPageSeo({
      title: 'Contact Us | ExpediNap - Excursions & Transportation in Punta Cana',
      description: 'Get in touch with ExpediNap for questions, custom excursion bookings, or private transportation in Punta Cana and the Dominican Republic.',
      url: 'https://www.expedinap.com/contact',
      keywords: [
        'contact expedinap',
        'punta cana excursion customer service',
        'book transportation punta cana',
        'expedinap support'
      ],
      type: 'website'
    });
  }

  enviarFormulario() {
    // 1. Bloqueo de seguridad
    if (this.isProcessing) return;

    if (this.contactoForm.invalid) {

      this.contactoForm.markAllAsTouched();
      return; // Salimos de la función
    }

    // 2. Iniciamos procesamiento
    this.isProcessing = true;

    const formValues = this.contactoForm.value

    const emailData: EmailSenderBase = {
      fullName: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone || "Not provided",
      message: formValues.message
    }

    this.emailSenderService.sendEmailContact(emailData)
      .pipe(
        takeUntil(this.destroy$),
        // finalize garantiza que el botón se reactive siempre, sea éxito o error
        finalize(() => this.isProcessing = false)
      )
      .subscribe({
        next: (response) => {
          this.alertService.showAlert(
            'success',
            'Email Has Been Sent',
            `Thank ${response.data.fullName} for contacting Expedinap`
          );
          this.contactoForm.reset(); // Limpiamos el formulario tras el éxito
        },
        error: (error) => {
          this.alertService.showAlert(
            'destructive',
            'Email Could Not Be Sent',
            'Your email could not be sent. Please try again later or use your email provider to contact us.'
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
