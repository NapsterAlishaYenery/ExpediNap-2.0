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
  @Input() duration: number = 5000; // Recibimos la duración en ms

  get variantClasses(): string {
    const variants: Record<AlertVariant, string> = {
      default: 'border-border bg-card/95 text-foreground',
      destructive: 'border-destructive/30 bg-destructive/5 text-destructive',
      success: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500',
      info: 'border-accent/30 bg-accent/5 text-accent',
      warning: 'border-amber-500/30 bg-amber-500/5 text-amber-500'
    };
    return variants[this.variant];
  }

  get progressBarClass(): string {
    const colors: Record<AlertVariant, string> = {
      default: 'bg-primary',
      destructive: 'bg-red-500', // <-- Antes quizás faltaba este
      success: 'bg-emerald-500',
      info: 'bg-accent',
      warning: 'bg-amber-500'
    };
    // Si por alguna razón la variante no existe, ponemos un color por defecto
    return colors[this.variant] || colors['default'];
  }
  
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
