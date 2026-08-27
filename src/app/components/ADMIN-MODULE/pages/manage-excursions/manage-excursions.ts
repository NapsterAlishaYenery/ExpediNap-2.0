import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { Router } from '@angular/router';
import { ExcursionService } from '../../../../core/services/excursios/excursion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-manage-excursions',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './manage-excursions.html',
  styleUrl: './manage-excursions.css',
})
export class ManageExcursions implements OnInit, OnDestroy{

  private excursionService = inject(ExcursionService);
  private router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  // Columnas estratégicas para gestión rápida
  columns: TableColumn[] = [
    { key: 'name', label: 'Excursion Name' },
    { key: 'location.locationName', label: 'Location' }, // ✅ Ahora es anidado
    { key: 'categories', label: 'Categories' },
    { key: 'pricing.adultPrice', label: 'Adult Price', type: 'currency' }, // ✅ Nuevo
    { key: 'pricing.childPrice', label: 'Child Price', type: 'currency' }, // ✅ Nuevo
    { key: 'duration.value', label: 'Duration' }, // ✅ duration.value
    { key: 'duration.unit', label: 'Unit' }, // ✅ duration.unit (nuevo)
    { key: 'minimumAge', label: 'Min. Age' },
    { key: 'isFeatured', label: 'Featured', type: 'boolean' }, // ✅ Cambiar a 'boolean'
    { key: 'isPublished', label: 'Status', type: 'boolean' } // ✅ Cambiar a 'boolean'
  ];

  excursions: any[] = [];
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
    category: '',
    location: ''
  };

  ngOnInit() {
    this.loadExcursions();
  }

  loadExcursions(page: number = 1) {
    this.loading = true;
    this.excursionService.getExcursions(
      page,
      this.paginationConfig.limit,
      this.filters.name,
      this.filters.category,
      this.filters.location
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        this.excursions = res.data;
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
      error: () => this.loading = false
    });
  }

  applyFilters() {
    this.paginationConfig.currentPage = 1;
    this.loadExcursions();
  }

  resetFilters() {
    this.filters = { name: '', category: '', location: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadExcursions(newPage);
  }

  // BOTÓN ESTRATÉGICO: Redirigir a un formulario nuevo
  navigateToAdd() {
    this.router.navigate(['/admin/excursions/new']);
  }

  handleEdit(excursion: any) { 
    this.router.navigate(['/admin/excursions/edit', excursion._id]);
  }

  handleDelete(excursion: any) { 
    console.log('Delete logic for:', excursion.name);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
