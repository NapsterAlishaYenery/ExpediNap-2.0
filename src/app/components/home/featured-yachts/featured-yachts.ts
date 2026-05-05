import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { Button } from '../../ui/button/button';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-yachts',
  imports: [YachtCard, Button, RouterLink],
  templateUrl: './featured-yachts.html',
  styleUrl: './featured-yachts.css',
})
export class FeaturedYachts implements OnInit, OnDestroy{
private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject
private yachtService = inject(YachtService);
  
  yachtsList: YachtResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    // Pedimos página 1, límite 3 para la sección destacada
    this.yachtService.getYachts(1, 4)
    .pipe(takeUntil(this.destroy$)) // 4. Aplicar takeUntil antes del subscribe
    .subscribe({
      next: (response) => {
        this.yachtsList = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  // 5. Limpiar al destruir el componente
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
