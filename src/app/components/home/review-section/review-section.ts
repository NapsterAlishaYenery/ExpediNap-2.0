import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../../ui/button/button';
import { ReviewService } from '../../../core/services/review/review.service';
import { Subject, takeUntil } from 'rxjs';
import { GoogleReviewData } from '../../../core/interfaces/review/google-review.interface';
import { ReviewGoogleCard } from '../../ui/review-google-card/review-google-card';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-review-section',
  imports: [IconsModule, ReviewGoogleCard, Button],
  templateUrl: './review-section.html',
  styleUrl: './review-section.css',
})
export class ReviewSection implements OnInit, OnDestroy {

  private reviewServices = inject(ReviewService);
  private readonly destroy$ = new Subject<void>();

  private platformId = inject(PLATFORM_ID);

  googleReviewData: GoogleReviewData = {
    rating: 0,
    totalReviews: 0,
    businessName: '',
    reviews: [] // <--- Importante para que el carrusel no rompa al inicio
  };

  showingCount: number = 0

  isLoading = true;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  activeIndex = 0;

  // Escucha el scroll para actualizar qué "dot" está activo
  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveDot();
    }
  }

  updateActiveDot() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollLeft = this.scrollContainer?.nativeElement?.scrollLeft || 0;
      const itemWidth = 320 + 32;
      this.activeIndex = Math.round(scrollLeft / itemWidth);
    }
  }

  // 1. Función para navegar al hacer clic en un punto
  scrollToIndex(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      const container = this.scrollContainer?.nativeElement;
      if (container) {
        const elements = container.querySelectorAll('app-review-google-card');
        if (elements[index]) {
          elements[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
          this.activeIndex = index;
        }
      }
    }
  }


  // Metodos del ciclo de vida del componente
  ngOnInit(): void {
    // reviews data de google 
    if (isPlatformBrowser(this.platformId)) {
      this.loadReviewDataGoogle();
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadReviewDataGoogle(): void {
    this.reviewServices.getGoogleReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.googleReviewData = response.data;
          this.showingCount = response.data.reviews.length
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
  }
}
