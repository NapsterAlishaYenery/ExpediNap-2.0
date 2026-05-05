import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'hero' | 'heroOutline' | 'accent' | 'accentOutline' | 'glass' | 'whatsapp';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
// Inputs con decoradores clásicos
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  // Output clásico para el click
  @Output() onClick = new EventEmitter<Event>();

  // Método para manejar las clases dinámicamente
  get buttonClasses(): string {
    const baseClass = 'btn';
    const variantClass = `variant-${this.variant}`;
    const sizeClass = `size-${this.size}`;
    const customClass = this.className;

    return `${baseClass} ${variantClass} ${sizeClass} ${customClass}`.trim();
  }

  // Manejador del evento click
  handleButtonClick(event: Event): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
