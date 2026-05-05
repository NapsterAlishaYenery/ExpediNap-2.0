import { Component, inject } from '@angular/core';
import { OrderExcursionService } from '../../../../core/services/orders-services/order-excursion/order-excursion.service';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { CommonModule } from '@angular/common';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { IconsModule } from '../../../../core/icons.module';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-listing-component',
  imports: [CommonModule, GenericTable, IconsModule, FormsModule],
  templateUrl: './activity-listing-component.html',
  styleUrl: './activity-listing-component.css',
})
export class ActivityListingComponent {

  private excursionService = inject(OrderExcursionService);
  private readonly destroy$ = new Subject<void>();

  // Configuración de la tabla
  excursionColumns: TableColumn[] = [
    { key: 'customer.fullName', label: 'Customer' },
    { key: 'orderNumber', label: 'Code' },
    { key: 'excursionName', label: 'Excursion' },
    { key: 'pricing.totalPrice', label: 'Total', type: 'currency' },
    { key: 'status', label: 'Estado', type: 'badge' }
  ];

  // Estado de los datos
  excursionOrders: any[] = [];
  loading = false;

  // Filtros (Se vinculan al HTML)
  filters = {
    status: 'pending',
    customerName: '',
    orderNumber: '',
    excursionName: ''
  };

  ngOnInit() {
    this.loadExcursions();
  }

  loadExcursions() {
    this.loading = true;
    
    // Consumimos el servicio usando tus parámetros
    this.excursionService.getAllExcursionOrders(
      1, // página
      50, // límite
      this.filters.status,
      this.filters.customerName,
      this.filters.orderNumber,
      this.filters.excursionName
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.excursionOrders = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar órdenes:', err);
        this.loading = false;
      }
    });
  }

  // Método para el botón de búsqueda o filtros rápidos
  applyFilters() {
    this.loadExcursions();
  }

  // Limpiar filtros
  resetFilters() {
    this.filters = {
      status: 'pending',
      customerName: '',
      orderNumber: '',
      excursionName: ''
    };
    this.loadExcursions();
  }

  handleEdit(order: any) { console.log('Editando:', order); }
  handleDelete(order: any) { console.log('Borrando:', order); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
