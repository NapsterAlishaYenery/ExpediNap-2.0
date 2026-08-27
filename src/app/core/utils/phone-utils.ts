import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class PhoneUtils {
    /**
     * VALIDADOR PERSONALIZADO para teléfono (mínimo 7, máximo 20 dígitos)
     * Uso: phone: ['', [Validators.required, PhoneUtils.validatePhone]]
     */
    static validatePhone(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';
        const digits = value.replace(/\D/g, '');
        
        if (digits.length < 7) {
            return { minDigits: true };
        }
        
        if (digits.length > 20) {
            return { maxDigits: true };
        }
        
        return null;
    }

    /**
     * FORMATEA el teléfono mientras el usuario escribe
     * Uso: (input)="PhoneUtils.formatPhoneForDisplay($event, bookingForm, 'phone')"
     */
    static formatPhoneForDisplay(event: any, formGroup: FormGroup, fieldName: string = 'phone'): void {
        let value = event.target.value.replace(/\D/g, ''); // Solo dígitos

        // Limitar a 20 dígitos
        if (value.length > 20) {
            value = value.slice(0, 20);
        }

        // Si hay dígitos, formatear
        if (value.length > 0) {
            // Formato: 1 (809) 555-1234
            if (value.length <= 1) {
                value = value;
            } else if (value.length <= 4) {
                value = value.slice(0, 1) + ' (' + value.slice(1);
            } else if (value.length <= 7) {
                value = value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4);
            } else {
                value = value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
            }
        }

        // Actualizar el valor del campo sin emitir evento para evitar loops
        formGroup.patchValue({ [fieldName]: value }, { emitEvent: false });
    }

    /**
     * SANITIZA el teléfono (solo dígitos) antes de enviar al backend
     * Uso: const cleanPhone = PhoneUtils.sanitizePhone(formValue.phone);
     */
    static sanitizePhone(phone: string): string {
        return phone.replace(/\D/g, '');
    }

    /**
     * VALIDA que el teléfono tenga entre 7 y 20 dígitos
     * Uso: if (!PhoneUtils.isValidPhone(phone)) { ... }
     */
    static isValidPhone(phone: string): boolean {
        if (!phone) return false;
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 7 && digits.length <= 20;
    }

    /**
     * OBTIENE solo los dígitos del teléfono
     * Uso: const digits = PhoneUtils.getDigitsOnly(phone);
     */
    static getDigitsOnly(phone: string): string {
        if (!phone) return '';
        return phone.replace(/\D/g, '');
    }
}