import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../../api/api-services';
import { CreateOrderYacht, OrderYachtResponse, OrderYachtStats, UpdateOrderYacht } from '../../../interfaces/orders/order-yachts/order-yacht.interface';
import { ApiResponse } from '../../../interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderYachtService {

  private api = inject(ApiServices);
  private prefix = 'orders-yacht';

  constructor() { }

  createOrderExcursion(data: CreateOrderYacht): Observable<ApiResponse<OrderYachtResponse>> {
    return this.api.post<ApiResponse<OrderYachtResponse>>(`${this.prefix}/request`, data);
  }


  getAllOrderYachts(
    page: number = 1,
    limit: number = 10,
    status: string = 'pending',
    customerName?: string,
    orderNumber?: string
  ): Observable<ApiResponse<OrderYachtResponse[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) params = params.set('status', status);
    if (customerName) params = params.set('customerName', customerName);
    if (orderNumber) params = params.set('orderNumber', orderNumber);

    return this.api.get<ApiResponse<OrderYachtResponse[]>>(`${this.prefix}/all-orders`, params);
  }

  getOrderById(id: string): Observable<ApiResponse<OrderYachtResponse>> {
    return this.api.get<ApiResponse<OrderYachtResponse>>(`${this.prefix}/detail/${id}`);
  }

  getYachtStats(): Observable<ApiResponse<OrderYachtStats>> {
    return this.api.get<ApiResponse<OrderYachtStats>>(`${this.prefix}/stats`);
  }

  updateOrderYacht(id: string, data: UpdateOrderYacht): Observable<ApiResponse<OrderYachtResponse>> {
    return this.api.patch<ApiResponse<OrderYachtResponse>>(`${this.prefix}/update/${id}`, data);
  }

  deleteOrderYacht(id: string): Observable<ApiResponse<OrderYachtResponse>> {
    return this.api.delete<ApiResponse<OrderYachtResponse>>(`${this.prefix}/delete/${id}`);
  }

  purgeOrderYacht(id: string): Observable<ApiResponse<OrderYachtResponse>> {
    return this.api.delete<ApiResponse<OrderYachtResponse>>(`${this.prefix}/purge/${id}`);
  }

}
