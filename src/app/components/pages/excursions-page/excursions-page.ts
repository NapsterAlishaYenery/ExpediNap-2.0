import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../ui/pagination/pagination';
import { ExcursionCard } from '../../ui/excursion-card/excursion-card';
import { IconsModule } from '../../../core/icons.module';
import { ExcursionService } from '../../../core/services/excursios/excursion.service';
import { ExcursionResponse } from '../../../core/interfaces/excursion/excursion.interface';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-excursions-page',
  imports: [CommonModule, Pagination, ExcursionCard, IconsModule],
  templateUrl: './excursions-page.html',
  styleUrl: './excursions-page.css',
})
export class ExcursionsPage implements OnInit, OnDestroy {
  private excursionService = inject(ExcursionService);
  private readonly destroy$ = new Subject<void>(); // 4. El "interruptor" de memoria

  excursions: ExcursionResponse[] = [];
  paginationData?: PaginationMetadata | null = null;
  currentCategory: string = '';
  currentPage: number = 1;
  isLoading: boolean = false;


  categories = [
    { id: '', label: 'All', icon: 'layout-grid' },
    { id: 'land', label: 'land', icon: '' },
    { id: 'sea', label: 'sea', icon: '' },
    { id: 'culture', label: 'culture', icon: '' },
    { id: 'snorkeling', label: 'snorkeling', icon: '' },
    { id: 'scuba-diving', label: 'scuba-diving', icon: '' },
    { id: 'wildlife', label: 'wildlife', icon: '' },
    { id: 'nightlife', label: 'nightlife', icon: '' },
    { id: 'adventure', label: 'adventure', icon: '' },
    { id: 'nature', label: 'nature', icon: '' },
    { id: 'marine', label: 'marine', icon: '' }
  ];

  ngOnInit() {
    this.loadExcursions();
  }

  loadExcursions(page: number = 1, category?: string) {
    // 1. Encendemos el cargando
    this.isLoading = true;

    this.excursionService.getExcursions(page, 12, undefined, category || this.currentCategory)
      .pipe(takeUntil(this.destroy$)) // 5. Limpiar si el componente se destruye
      .subscribe({
        next: (res) => {
          this.excursions = res.data;
          this.paginationData = res.pagination;
          this.currentPage = page;
          // 2. Apagamos el cargando cuando llegan los datos
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; // También lo apagamos si hay error
        }
      });
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;

    this.currentCategory = categoryId;
    this.loadExcursions(1, categoryId);
  }

  filterByCategory(catId: string) {
    this.currentCategory = catId;
    this.loadExcursions(1, catId);
  }

  // 6. Método de limpieza obligatoria
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
