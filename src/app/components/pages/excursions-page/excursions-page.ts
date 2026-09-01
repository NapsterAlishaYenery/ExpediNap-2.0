import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../ui/pagination/pagination';
import { ExcursionCard } from '../../ui/excursion-card/excursion-card';
import { IconsModule } from '../../../core/icons.module';
import { ExcursionService } from '../../../core/services/excursios/excursion.service';
import { ExcursionResponse } from '../../../core/interfaces/excursion/excursion.interface';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { HeroGeneric } from '../../ui/hero-generic/hero-generic';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-excursions-page',
  imports: [Pagination, ExcursionCard, IconsModule, HeroGeneric, TitleCasePipe,],
  templateUrl: './excursions-page.html',
  styleUrl: './excursions-page.css',
})
export class ExcursionsPage implements OnInit, OnDestroy {
  private excursionService = inject(ExcursionService);
  private readonly destroy$ = new Subject<void>(); // 4. El "interruptor" de memoria

  private titleService = inject(Title);
  private metaService = inject(Meta);

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
    // 🔥 METADATOS
    this.titleService.setTitle('Best Excursions in Punta Cana | Book Tours & Adventures | ExpediNap');

    this.metaService.updateTag({
      name: 'description',
      content: 'Discover the best excursions in Punta Cana, Dominican Republic. Book Saona Island tours, buggy adventures, snorkeling, catamaran trips, and private yacht rentals. Best price guaranteed.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'excursions Punta Cana, tours Dominican Republic, Saona Island, buggy adventure, snorkeling Punta Cana, catamaran tour, scuba diving, Punta Cana excursions, things to do Punta Cana, Caribbean tours, adventure travel'
    });

    // Open Graph (para compartir en redes)
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Best Excursions in Punta Cana | Book Tours & Adventures | ExpediNap'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Discover and book the best excursions in Punta Cana. From Saona Island to buggy adventures, find your perfect tour with ExpediNap.'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/dfwpolska/image/upload/v1788065963/social-imag-excursions.webp'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.expedinap.com/excursions'
    });
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
