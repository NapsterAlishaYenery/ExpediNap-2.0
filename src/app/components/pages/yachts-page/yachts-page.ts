import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { Pagination } from '../../ui/pagination/pagination';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-yachts-page',
  imports: [YachtCard, Pagination],
  templateUrl: './yachts-page.html',
  styleUrl: './yachts-page.css',
})
export class YachtsPage implements OnInit, OnDestroy{
 private yachtService = inject(YachtService);
 private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject

  yachts: YachtResponse[] = [];
  isLoading = false;
  paginationData?: PaginationMetadata | null = null;
  currentPage: number = 1;



  ngOnInit(): void {
   this.loadYachts();
  }

 loadYachts(page: number = 1): void {
    // 1️⃣ encendemos loading
    this.isLoading = true;

    this.yachtService.getYachts(page, 12)
    .pipe(takeUntil(this.destroy$)) // 4. Cortar suscripción al salir de la página
    .subscribe({
      next: (res) => {
        this.yachts = res.data;
        this.paginationData = res.pagination;
        this.currentPage = page;  

        // 2️⃣ apagamos loading
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
  // 5. Limpieza obligatoria
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
