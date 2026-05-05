import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { NcfService } from '../../../../core/services/ncf-service/ncf.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-manage-ncf',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './manage-ncf.html',
  styleUrl: './manage-ncf.css',
})
export class ManageNcf implements OnInit, OnDestroy {
  private ncfService = inject(NcfService);
  private readonly destroy$ = new Subject<void>();

  columns: TableColumn[] = [
    { key: 'ncf', label: 'NCF Number' },
    { key: 'tipoNcf', label: 'Type' },
    { key: 'estado', label: 'Status' },
    { key: 'fechaVencimiento', label: 'Expiry Date', type: 'date' },
    { key: 'orderId', label: 'Order Ref' },
    { key: 'usadoEn', label: 'Used At', type: 'date' }
  ];

  ncfs: any[] = [];
  loading = false;

  ncfTypes = [
    { id: '', label: 'All Types' },
    { id: 'B01', label: 'B01 - Credit' },
    { id: 'B02', label: 'B02 - Consumer' },
    { id: 'B11', label: 'B11 - Purchases' },
    { id: 'B16', label: 'B16 - Export' },
  ];

  statusOptions = [
    { id: '', label: 'All Status' },
    { id: 'available', label: 'Available' },
    { id: 'used', label: 'Used' },
    { id: 'expired', label: 'Expired' },
    { id: 'reserved', label: 'Reserved' },
  ];

  paginationConfig = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 50 // Usamos 50 como en tu servicio
  };

  filters = {
    ncf: '',
    tipoNcf: '',
    estado: ''
  };

  ngOnInit() {
    this.loadNcfs();
  }

  loadNcfs(page: number = 1) {
    this.loading = true;
    this.ncfService.getAllNcf(
      page,
      this.paginationConfig.limit,
      this.filters.tipoNcf,
      this.filters.estado,
      this.filters.ncf
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        this.ncfs = res.data;
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
    this.loadNcfs();
  }

  resetFilters() {
    this.filters = { ncf: '', tipoNcf: '', estado: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadNcfs(newPage);
  }

  // Para NCF usualmente abriremos un modal de carga masiva
  openBulkUpload() {
    console.log('Open modal for bulk NCF upload');
  }

  handleDelete(ncf: any) {
    if (ncf.estado === 'used') {
        alert('Cannot delete a used NCF number.');
        return;
    }
    if(confirm(`Delete NCF: ${ncf.ncf}?`)) {
       console.log('Deleting NCF:', ncf._id);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
