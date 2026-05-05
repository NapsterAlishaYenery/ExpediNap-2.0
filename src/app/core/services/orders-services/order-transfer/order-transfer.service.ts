import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../../api/api-services';
import { CreateOrderTransfer, OrdertransferResponse, OrderTransferStats, UpdateOrderTransfer } from '../../../interfaces/orders/order-transfers/order-transfer.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../interfaces/api/api-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderTransferService {

  private api = inject(ApiServices);
  private prefix = 'orders-transfer';

  constructor() { }


  getAllOrderTransfer(
    page: number = 1,
    limit: number = 10,
    status: string = 'pending',
    customerName?: string,
    orderNumber?: string,

  ): Observable<ApiResponse<OrdertransferResponse[]>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) params = params.set('status', status);
    if (customerName) params = params.set('customerName', customerName);
    if (orderNumber) params = params.set('orderNumber', orderNumber);

    return this.api.get<ApiResponse<OrdertransferResponse[]>>(`${this.prefix}/all-orders`, params);
  }

  // 4. Obtener detalle por ID (ADMIN)
  getOrderById(id: string): Observable<ApiResponse<OrdertransferResponse>> {
    return this.api.get<ApiResponse<OrdertransferResponse>>(`${this.prefix}/detail/${id}`);
  }

  getOrderTransferStats(): Observable<ApiResponse<OrderTransferStats>> {
    return this.api.get<ApiResponse<OrderTransferStats>>(`${this.prefix}/stats`);
  }

  createOrderTransfer(data: CreateOrderTransfer): Observable<ApiResponse<OrdertransferResponse>> {
    return this.api.post<ApiResponse<OrdertransferResponse>>(`${this.prefix}/request`, data);
  }

  updateOrderTransfer(id: string, data: UpdateOrderTransfer): Observable<ApiResponse<OrdertransferResponse>> {
    return this.api.patch<ApiResponse<OrdertransferResponse>>(`${this.prefix}/update/${id}`, data);
  }

  // 6. Borrado lógico (ADMIN) - Mueve a status 'deleted'
  deleteOrderTransfer(id: string): Observable<ApiResponse<OrdertransferResponse>> {
    return this.api.delete<ApiResponse<OrdertransferResponse>>(`${this.prefix}/delete/${id}`);
  }

  // 7. Borrado físico (ADMIN) - Elimina de la DB para siempre
  purgeOrderTransfer(id: string): Observable<ApiResponse<OrdertransferResponse>> {
    return this.api.delete<ApiResponse<OrdertransferResponse>>(`${this.prefix}/purge/${id}`);
  }
}
