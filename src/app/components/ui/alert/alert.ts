import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'info' | 'warning';

@Component({
  selector: 'app-alert',
  imports: [CommonModule, IconsModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {

  @Input() variant: AlertVariant = 'default';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon?: string;

  get alertClasses(): string {
    return `alert alert-${this.variant}`;
  }

  // Mapa de iconos por defecto si no se pasa uno
 get iconClass(): string {
    if (this.icon) return `bi bi-${this.icon}`;

    const icons: Record<AlertVariant, string> = {
      default: 'bi-stars',
      destructive: 'bi-exclamation-octagon',
      success: 'bi-check2-circle',
      info: 'bi-info-circle',
      warning: 'bi-exclamation-triangle'
    };
    return `bi ${icons[this.variant]}`;
  }
}
