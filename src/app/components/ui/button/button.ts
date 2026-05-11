import { Component, EventEmitter, Input, Output } from '@angular/core';

// Limpiamos los tipos para que coincidan con lo que realmente implementamos
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'hero' | 'heroOutline' | 'accent' | 'accentOutline' | 'glass' | 'whatsapp';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon' | 'full';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 rounded-(--radius) font-medium transition-all duration-300 cursor-pointer border-none disabled:opacity-50 disabled:pointer-events-none hover:brightness-110 hover:-translate-y-0.5';

    const variants: Record<ButtonVariant, string> = {
      default: 'bg-primary text-primary-foreground shadow-primary',
      accent: 'bg-accent text-accent-foreground shadow-glow',
      accentOutline: 'bg-transparent border-2 border-accent text-accent',
      hero: 'bg-gradient-brand text-primary-foreground shadow-primary',
      heroOutline: 'bg-transparent border-2 border-(--color-on-image-border) text-(--color-on-image)',
      outline: 'bg-transparent border border-border text-foreground',
      glass: 'bg-gradient-glass backdrop-blur-xl border border-white/20 text-foreground',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      whatsapp: 'bg-[#25D366] text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)]',
      destructive: 'bg-red-600 text-white shadow-md',
      secondary: 'bg-secondary text-secondary-foreground shadow-md',
      link: 'bg-transparent underline text-primary hover:no-underline shadow-none hover:translate-y-0'
    };

    const sizes: Record<ButtonSize, string> = {
      default: 'h-10 px-4',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-8 text-base',
      xl: 'h-14 px-10 text-lg',
      icon: 'h-10 w-10 p-0',
      // Tamaño full: ocupa el ancho disponible con márgenes internos de seguridad
      full: 'w-[calc(100%-2rem)] mx-4 my-2 h-12 text-base'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${this.className}`;
  }
  handleButtonClick(event: Event): void {
    if (!this.disabled) this.onClick.emit(event);
  }
}
