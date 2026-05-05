import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StatsCardViewAdmin } from '../../ui/stats-card-view-admin/stats-card-view-admin';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard-service/dashboard.service';
import { DashboardSummary } from '../../core/interface/dashboard-summary/dashboard-summary.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-summary-section-admin',
  imports: [CommonModule, StatsCardViewAdmin],
  templateUrl: './summary-section-admin.html',
  styleUrl: './summary-section-admin.css',
})
export class SummarySectionAdmin implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private readonly destroy$ = new Subject<void>();

  summaryData?: DashboardSummary;
  loading = true;

  ngOnInit(): void {
    this.dashboardService.getSummary()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.summaryData = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
