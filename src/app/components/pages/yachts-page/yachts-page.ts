import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { Pagination } from '../../ui/pagination/pagination';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { HeroGeneric } from '../../ui/hero-generic/hero-generic';

@Component({
  selector: 'app-yachts-page',
  imports: [YachtCard, Pagination, HeroGeneric],
  templateUrl: './yachts-page.html',
  styleUrl: './yachts-page.css',
})
export class YachtsPage implements OnInit, OnDestroy {
  private yachtService = inject(YachtService);
  private readonly destroy$ = new Subject<void>(); // 3. Crear el Subject

  private titleService = inject(Title);
  private metaService = inject(Meta);

  yachts: YachtResponse[] = [];
  isLoading = false;
  paginationData?: PaginationMetadata | null = null;
  currentPage: number = 1;



  ngOnInit(): void {

    this.titleService.setTitle('Private Yacht Rentals & Boat Charters Punta Cana | Luxury Yachts | ExpediNap');

    this.metaService.updateTag({
      name: 'description',
      content: 'Book luxury private yacht rentals and boat charters in Punta Cana. Sail the Caribbean in style with our exclusive fleet. Perfect for parties, sunsets, and unforgettable experiences.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'yacht rental Punta Cana, private yacht charters, luxury boat rentals, catamaran Punta Cana, sailing tours, Caribbean yacht, boat party Punta Cana, sunset cruise, ExpediNap yachts'
    });

    // 🔥 Open Graph (para compartir en redes)
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Luxury Yacht Rentals in Punta Cana | Sail the Caribbean | ExpediNap'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Discover our exclusive fleet of luxury yachts in Punta Cana. Perfect for private parties, romantic sunsets, and unforgettable sailing experiences.'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/dfwpolska/image/upload/v1788065963/social-imag-yachts.webp' // ⚠️ Cambiar por una imagen de yates
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.expedinap.com/yachts'
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
