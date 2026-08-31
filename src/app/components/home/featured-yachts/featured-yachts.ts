import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { YachtCard } from '../../ui/yacht-card/yacht-card';
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { YachtService } from '../../../core/services/yachts/yacht.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-yachts',
  imports: [YachtCard, RouterLink],
  templateUrl: './featured-yachts.html',
  styleUrl: './featured-yachts.css',
})
export class FeaturedYachts implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private yachtService = inject(YachtService);

  yachtsList: YachtResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadFeaturedYachts();
  }

  loadFeaturedYachts(): void {
    this.yachtService.getYachts(1, 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.yachtsList = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching featured yachts:', error);
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
