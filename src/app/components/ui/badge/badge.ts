import { Component, Input } from '@angular/core';

// Añadimos las variantes de marca para que coincidan con los botones
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'accent' | 'hero';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() variant: BadgeVariant = 'default';
  @Input() className: string = '';

  get badgeClasses(): string {
    return `badge variant-${this.variant} ${this.className}`.trim();
  }
}
