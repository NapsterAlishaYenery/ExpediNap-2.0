import { Injectable, signal } from '@angular/core';
import { AlertOptions } from '../../interfaces/alert-dialog/alert-dialog.interface';

@Injectable({
  providedIn: 'root',
})

export class AlertDialogService {
  // Signals para el estado
  private _isOpen = signal<boolean>(false);
  private _options = signal<AlertOptions | null>(null);
  
  // Public Read-only Signals
  isOpen = this._isOpen.asReadonly();
  options = this._options.asReadonly();

  // Para manejar la respuesta del usuario (usamos Promise para que sea más moderno)
  private resolveCallback?: (value: boolean) => void;

  confirm(options: AlertOptions): Promise<boolean> {
    this._options.set(options);
    this._isOpen.set(true);
    document.body.style.overflow = 'hidden';

    return new Promise((resolve) => {
      this.resolveCallback = resolve;
    });
  }

  handleConfirm() {
    this.close(true);
  }

  handleCancel() {
    this.close(false);
  }

  private close(result: boolean) {
    this._isOpen.set(false);
    document.body.style.overflow = 'auto';
    this.resolveCallback?.(result);
  }
}
