import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderYachtService } from '../../../../core/services/orders-services/order-yacht/order-yacht.service';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-admin-yacht-orders',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './admin-yacht-orders.html',
  styleUrl: './admin-yacht-orders.css',
})
export class AdminYachtOrders implements OnInit, OnDestroy{

  private yachtService = inject(OrderYachtService);
  private readonly destroy$ = new Subject<void>();

  // Definición de columnas para Yates
  columns: TableColumn[] = [
    { key: 'customer.fullName', label: 'Customer' },
    { key: 'orderNumber', label: 'Order #' },
    { key: 'yachtName', label: 'Yacht' },
    { key: 'destination', label: 'Destination' },
    { key: 'travelDate', label: 'Travel Date', type: 'date' },
    { key: 'duration', label: 'Duration' },
    { key: 'fiscalData.ncf', label: 'NCF' },
    { key: 'pricing.totalPrice', label: 'Total', type: 'currency' },
    { key: 'status', label: 'Status', type: 'badge' }
  ];

  orders: any[] = [];
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
    status: '',
    customerName: '',
    orderNumber: ''
  };

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(page: number = 1) {
    this.loading = true;
    this.yachtService.getAllOrderYachts(
      page,
      this.paginationConfig.limit,
      this.filters.status,
      this.filters.customerName,
      this.filters.orderNumber
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
    this.filters = { status: '', customerName: '', orderNumber: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadOrders(newPage);
  }

  handleEdit(order: any) { console.log('Editing Yacht Order:', order); }
  handleDelete(order: any) { console.log('Deleting Yacht Order:', order); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
