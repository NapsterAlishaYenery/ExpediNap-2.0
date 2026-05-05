import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { OrderTransferService } from '../../../../core/services/orders-services/order-transfer/order-transfer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-admin-transfer-orders',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './admin-transfer-orders.html',
  styleUrl: './admin-transfer-orders.css',
})
export class AdminTransferOrders implements OnInit, OnDestroy {
  private transferService = inject(OrderTransferService);
  private readonly destroy$ = new Subject<void>();

  // Columnas específicas para Transfers
  columns: TableColumn[] = [
    { key: 'customer.fullName', label: 'Customer' },
    { key: 'orderNumber', label: 'Order #' },
    { key: 'transferType', label: 'Type' },
    { key: 'pickUpLocation', label: 'Pick Up' },
    { key: 'destination', label: 'Destination' },
    { key: 'pickUpDate', label: 'Date', type: 'date' },
    { key: 'numPassengers', label: 'Pax' },
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
    this.transferService.getAllOrderTransfer(
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

  handleEdit(order: any) { console.log('Editing Transfer Order:', order); }
  handleDelete(order: any) { console.log('Deleting Transfer Order:', order); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
