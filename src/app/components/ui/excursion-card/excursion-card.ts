import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { ImageUrlPipe } from "../../../core/pipes/image-url.pipe";
import { ExcursionResponse } from '../../../core/interfaces/excursion/excursion.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-excursion-card',
  imports: [CommonModule, IconsModule, Button, Badge, ImageUrlPipe, RouterLink],
  templateUrl: './excursion-card.html',
  styleUrl: './excursion-card.css',
})
export class ExcursionCard {
  @Input({ required: true }) excursion!: ExcursionResponse; // Aquí entraría tu objeto JSON

  private router = inject(Router); // 2. Inyectar

  // Método para formatear el texto de categorías (primera categoría)
  get mainCategory(): string {
    return this.excursion?.categories?.[0] || 'Tour';
  }

}
