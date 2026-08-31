import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AlertOptions } from '../../interfaces/alert-dialog/alert-dialog.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AlertDialogService {
  private platformId = inject(PLATFORM_ID);

  private _isOpen = signal<boolean>(false);
  private _options = signal<AlertOptions | null>(null);

  isOpen = this._isOpen.asReadonly();
  options = this._options.asReadonly();

  private resolveCallback?: (value: boolean) => void;

  confirm(options: AlertOptions): Promise<boolean> {
    this._options.set(options);
    this._isOpen.set(true);

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }

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

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }

    this.resolveCallback?.(result);
  }
}
