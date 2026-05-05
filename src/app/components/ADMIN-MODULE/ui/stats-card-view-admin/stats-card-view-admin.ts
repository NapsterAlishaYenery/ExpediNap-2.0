import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-stats-card-view-admin',
  imports: [CommonModule, IconsModule],
  templateUrl: './stats-card-view-admin.html',
  styleUrl: './stats-card-view-admin.css',
})
export class StatsCardViewAdmin {
  @Input() title: string = '';
  @Input() mainValue: string | number = '';
  @Input() icon: string = 'activity';
  @Input() variant: 'primary' | 'accent' | 'secondary' | 'warning' | 'danger' | 'success' = 'primary';

  // Para los detalles pequeños (ej. "Pendientes: 5")
  @Input() statsDetails: { label: string, value: number | string }[] = [];

  // Descripción opcional al pie
  @Input() footerText?: string;

  getVariantClass() {
    return `card-variant-${this.variant}`;
  }
}
