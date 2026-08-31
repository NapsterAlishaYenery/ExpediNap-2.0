import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Button, ButtonVariant } from '../button/button';
import { AlertDialogService } from '../../../core/services/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule, Button],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialog {
  public service = inject(AlertDialogService);

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.service.isOpen()) {
      this.service.handleCancel();
    }
  }
}
