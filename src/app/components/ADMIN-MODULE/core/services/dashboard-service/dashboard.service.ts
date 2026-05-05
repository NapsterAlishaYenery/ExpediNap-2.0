import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../../../../../core/services/api/api-services';
import { DashboardSummary } from '../../interface/dashboard-summary/dashboard-summary.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { OrderExcursionStats } from '../../../../../core/interfaces/orders/order-excursions/order-excursion.interface';
import { OrderYachtStats } from '../../../../../core/interfaces/orders/order-yachts/order-yacht.interface';
import { OrderTransferStats } from '../../../../../core/interfaces/orders/order-transfers/order-transfer.interface';
import { NcfStatsItem } from '../../../../../core/interfaces/fiscal-receipt-number/number-ncf.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private api = inject(ApiServices);

  getSummary(): Observable<DashboardSummary> {
    return forkJoin({
      // Ajustado según tu app.use('/api/orders-excursion', ...)
      excursions: this.api.get<ApiResponse<OrderExcursionStats>>('orders-excursion/stats'),
      
      // Ajustado según tu app.use('/api/orders-yacht', ...)
      yachts: this.api.get<ApiResponse<OrderYachtStats>>('orders-yacht/stats'),
      
      // Ajustado según tu app.use('/api/orders-transfer', ...)
      transfers: this.api.get<ApiResponse<OrderTransferStats>>('orders-transfer/stats'),
      
      // Ajustado según tu app.use('/api/ncf', ...)
      ncf: this.api.get<ApiResponse<NcfStatsItem[]>>('ncf/stats')
    }).pipe(
      map(resp => ({
        excursions: resp.excursions.data,
        yachts: resp.yachts.data,
        transfers: resp.transfers.data,
        ncf: resp.ncf.data
      }))
    );
  }
}
