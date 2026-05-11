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
    const base = 'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 w-fit cursor-default hover:brightness-110';

    const variants: Record<BadgeVariant, string> = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-red-600 text-white', // Puedes usar hsl(var(--destructive)) si la tienes definida
      outline: 'border-border text-foreground bg-transparent',
      accent: 'bg-accent text-accent-foreground',
      hero: 'bg-gradient-brand text-primary-foreground'
    };

    return `${base} ${variants[this.variant]} ${this.className}`.trim();
  }
}
