import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { Router } from '@angular/router';
import { YachtService } from '../../../../core/services/yachts/yacht.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-manage-yachts',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './manage-yachts.html',
  styleUrl: './manage-yachts.css',
})
export class ManageYachts implements OnInit, OnDestroy {
  private yachtService = inject(YachtService);
  private router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  // Columnas adaptadas a la data de Yates
  columns: TableColumn[] = [
    { key: 'name', label: 'Yacht Name' },
    { key: 'maxPax', label: 'Max Pax' },
    { key: 'saonaPrice.halfDay', label: 'Saona (Half)', type: 'currency' },
    { key: 'saonaPrice.fullDay', label: 'Saona (Full)', type: 'currency' },
    { key: 'catalinaPrice.halfDay', label: 'Catalina (Half)', type: 'currency' },
    { key: 'catalinaPrice.fullDay', label: 'Catalina (Full)', type: 'currency' },
    { key: 'riverSunset.price', label: 'River Sunse', type: 'currency' },
    { key: 'riverSunset.timeTrip', label: 'Time Trip' },
    { key: 'timeAvailable.halfDay', label: 'Half Day Hours' },
    { key: 'timeAvailable.fullDay', label: 'Full Day Hours' },
  ];

  yachts: any[] = [];
  loading = false;

  paginationConfig = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  };

  filters = {
    name: '',
    sortBy: 'createdAt',
    order: 'desc' as 'asc' | 'desc'
  };

  ngOnInit() {
    this.loadYachts();
  }

  loadYachts(page: number = 1) {
    this.loading = true;
    this.yachtService.getYachts(
      page,
      this.paginationConfig.limit,
      this.filters.name,
      this.filters.sortBy,
      this.filters.order
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.yachts = res.data;
          this.paginationConfig = {
            ...this.paginationConfig,
            currentPage: res.pagination.page,
            totalPages: res.pagination.totalPages,
            totalItems: res.pagination.totalItems,
            hasNextPage: res.pagination.hasNextPage,
            hasPrevPage: res.pagination.hasPrevPage
          };
          this.loading = false;
        },
        error: () => (this.loading = false)
      });
  }

  applyFilters() {
    this.paginationConfig.currentPage = 1;
    this.loadYachts();
  }

  resetFilters() {
    this.filters = { name: '', sortBy: 'createdAt', order: 'desc' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadYachts(newPage);
  }

  navigateToAdd() {
    this.router.navigate(['/admin/yachts/new']);
  }

  handleEdit(yacht: any) {
    this.router.navigate(['/admin/yachts/edit', yacht._id]);
  }

  handleDelete(yacht: any) {
    if (confirm(`Are you sure you want to delete ${yacht.name}?`)) {
      console.log('Delete logic for:', yacht._id);
      // Aquí llamarías al service.deleteYacht
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
