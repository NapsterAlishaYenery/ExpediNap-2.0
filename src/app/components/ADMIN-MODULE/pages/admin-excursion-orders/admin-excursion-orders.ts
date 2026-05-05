import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderExcursionService } from '../../../../core/services/orders-services/order-excursion/order-excursion.service';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-admin-excursion-orders',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './admin-excursion-orders.html',
  styleUrl: './admin-excursion-orders.css',
})
export class AdminExcursionOrders implements OnInit, OnDestroy {
  private excursionService = inject(OrderExcursionService);
  private readonly destroy$ = new Subject<void>();

  // Configuración completa de columnas (Scroll horizontal activado por cantidad)
  columns: TableColumn[] = [
    { key: 'customer.fullName', label: 'Customer' },
    { key: 'orderNumber', label: 'Order #' },
    { key: 'createdAt', label: 'Date', type: 'date' },
    { key: 'excursionName', label: 'Excursion' },
    { key: 'travelDate', label: 'Travel Date', type: 'date' },
    { key: 'pax.adults', label: 'Ad' },
    { key: 'pax.children', label: 'Ch' },
    { key: 'hotelName', label: 'Pickup Location' },
    { key: 'fiscalData.ncf', label: 'NCF' },
    { key: 'pricing.totalPrice', label: 'Total', type: 'currency' },
    { key: 'status', label: 'Status', type: 'badge' }
  ];

  orders: any[] = [];
  loading = false;
  
  // Paginación
  paginationConfig = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 12
  };

  // Filtros
  filters = {
    status: '',
    customerName: '',
    orderNumber: '',
    excursionName: ''
  };

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(page: number = 1) {
    this.loading = true;
    this.excursionService.getAllExcursionOrders(
      page,
      this.paginationConfig.limit,
      this.filters.status,
      this.filters.customerName,
      this.filters.orderNumber,
      this.filters.excursionName
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        this.orders = res.data;
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
    this.loadOrders();
  }

  resetFilters() {
    this.filters = { status: '', customerName: '', orderNumber: '', excursionName: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadOrders(newPage);
  }

  handleEdit(order: any) { console.log('Editing Order:', order); }
  handleDelete(order: any) { console.log('Deleting Order:', order); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
