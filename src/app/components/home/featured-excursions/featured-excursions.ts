import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ExcursionResponse } from '../../../core/interfaces/excursion/excursion.interface';
import { ExcursionService } from '../../../core/services/excursios/excursion.service';
import { ExcursionCard } from '../../ui/excursion-card/excursion-card';
import { Button } from '../../ui/button/button';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-featured-excursions',
  imports: [ExcursionCard, Button, RouterLink],
  templateUrl: './featured-excursions.html',
  styleUrl: './featured-excursions.css',
})
export class FeaturedExcursions implements OnInit, OnDestroy {
  private excursionService = inject(ExcursionService);
  private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject

  // Almacenamos solo las 3 que queremos mostrar
  featuredList: ExcursionResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadFeaturedExcursions();
  }

  loadFeaturedExcursions(): void {
    // Pedimos 3 excursiones (limit: 3)
    this.excursionService.getExcursions(
      1,            // page
      3,            // limit
      undefined,    // name
      undefined,    // category 
      undefined,    // location
      true          // isFeatured = true
    )
      .pipe(takeUntil(this.destroy$)) // 4. Cortar suscripción al destruir
      .subscribe({
        next: (response) => {
          this.featuredList = response.data; // Según tu ApiResponse interface
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
  }
  // 5. Método de limpieza obligatoria
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
