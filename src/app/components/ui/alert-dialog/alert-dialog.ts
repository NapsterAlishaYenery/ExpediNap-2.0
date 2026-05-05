import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button, ButtonVariant } from '../button/button';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule, Button],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialog {
  @Input() open = false;
  @Input() title = 'Are you sure?';
  @Input() description = 'This action cannot be undone.';

  // Botones personalizables
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  @Input() confirmVariant: ButtonVariant = 'default';

  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
