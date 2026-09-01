import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { Pagination } from '../../ui/pagination/pagination';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';
import { HeroGeneric } from '../../ui/hero-generic/hero-generic';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-yachts-page',
  imports: [YachtCard, Pagination, HeroGeneric],
  templateUrl: './yachts-page.html',
  styleUrl: './yachts-page.css',
})
export class YachtsPage implements OnInit, OnDestroy {
  private yachtService = inject(YachtService);
  private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject

  private seoService = inject(SeoService);

  yachts: YachtResponse[] = [];
  isLoading = false;
  paginationData?: PaginationMetadata | null = null;
  currentPage: number = 1;



  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Private Yacht Rentals & Boat Charters Punta Cana | Luxury Yachts | ExpediNap',
      description: 'Book luxury private yacht rentals and boat charters in Punta Cana. Sail the Caribbean in style with our exclusive fleet. Perfect for parties, sunsets, and unforgettable experiences.',
      url: 'https://www.expedinap.com/yachts',
      image: 'https://res.cloudinary.com/dfwpolska/image/upload/v1788065963/social-imag-yachts.webp',
      keywords: [
        'yacht rental Punta Cana',
        'private yacht charters',
        'luxury boat rentals',
        'catamaran Punta Cana',
        'sailing tours',
        'Caribbean yacht',
        'boat party Punta Cana',
        'sunset cruise',
        'ExpediNap yachts'
      ]
    });

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
