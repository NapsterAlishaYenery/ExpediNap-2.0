import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { Button } from '../../ui/button/button';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-featured-yachts',
  imports: [YachtCard, Button, RouterLink],
  templateUrl: './featured-yachts.html',
  styleUrl: './featured-yachts.css',
})
export class FeaturedYachts implements OnInit, OnDestroy{
private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject
private yachtService = inject(YachtService);

private platformId = inject(PLATFORM_ID);

  
  yachtsList: YachtResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    // 🔥 SOLO EN EL NAVEGADOR
    if (isPlatformBrowser(this.platformId)) {
      this.yachtService.getYachts(1, 4)
        .pipe(takeUntil(this.destroy$))
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
  }

  // 5. Limpiar al destruir el componente
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
