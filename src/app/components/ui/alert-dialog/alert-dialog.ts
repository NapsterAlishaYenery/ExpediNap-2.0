import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
}
