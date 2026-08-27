import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../../api/api-services';
import { CreateOrderExcursion, OrderExcursionResponse, OrderExcursionStats, UpdateOrderExcursion } from '../../../interfaces/orders/order-excursions/order-excursion.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../interfaces/api/api-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderExcursionService {

  private api = inject(ApiServices);
  private prefix = 'orders-excursion';

  constructor() { }


  // --- MÉTODOS DE PAYPAL AÑADIDOS cuanod tenga mi paypal---
  // 2. Capturar el pago después de que el usuario aprueba en el popup
  // Retorna ApiResponse<OrderExcursionResponse> porque tu backend devuelve la orden actualizada
  // capturePayPalPayment(paypalOrderId: string): Observable<ApiResponse<OrderExcursionResponse>> {
  //   return this.api.post<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/paypal/capture/${paypalOrderId}`, {});
  // }

  // createOrderExcursion(data: CreateOrderExcursion): Observable<ApiResponse<OrderExcursionResponse>> {
  //   return this.api.post<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/request`, data);
  // }


  // 3. crear la orden Manualmente
  createOrderExcursion(data: CreateOrderExcursion): Observable<ApiResponse<OrderExcursionResponse>> {
    return this.api.post<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/manual-request`, data);
  }

  // 2. Método de utilidad para generar el link de WhatsApp profesional
 generateWhatsAppLink(order: OrderExcursionResponse): string {
  const phoneNumber = '18098369303';
  
  // Formateamos las fechas para que se vean limpias
  // 1. Formatear la fecha de la orden (CreatedAt)
  const dateObj = new Date(order.createdAt);
  const orderDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

  // 2. Formatear la fecha del viaje (TravelDate) usando UTC
  // Esto evita que el -0400 de RD te mueva el día al anterior.
  const travelObj = new Date(order.travelDate);
  const travelDate = `${travelObj.getUTCDate()}/${travelObj.getUTCMonth() + 1}/${travelObj.getUTCFullYear()}`;

  // Mensaje unificado y formal
  const message = `*OFFICIAL BOOKING - EXPEDINAP*
---------------------------------------
*ORDER:* ${order.orderNumber}
*EXCURSION:* ${order.excursionName.toUpperCase()}
*CLIENT:* ${order.customer.fullName.toUpperCase()}
---------------------------------------
*ORDER DATE:* ${orderDate}
*TRAVEL DATE:* ${travelDate}
*PERSONS:* ${order.pax.adults} Adults / ${order.pax.children} Children
*HOTEL:* ${order.hotelName.toUpperCase() || 'TBD'}
---------------------------------------
*TOTAL TO PAY:* $${order.pricing.totalPrice.toFixed(2)} USD
---------------------------------------
I WOULD LIKE TO RECEIVE PAYMENT INSTRUCTIONS TO CONFIRM MY RESERVATION.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}


  getAllExcursionOrders(
    page: number = 1,
    limit: number = 12,
    status: string = 'pending',
    customerName?: string,
    orderNumber?: string,
    excursionName?: string
  ): Observable<ApiResponse<OrderExcursionResponse[]>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // Añadir filtros opcionales si existen
    if (customerName) params = params.set('customerName', customerName);
    if (status) params = params.set('status', status);
    if (orderNumber) params = params.set('orderNumber', orderNumber);
    if (excursionName) params = params.set('excursionName', excursionName);

    return this.api.get<ApiResponse<OrderExcursionResponse[]>>(`${this.prefix}/all-orders`, params);
  }

  getOrderById(id: string): Observable<ApiResponse<OrderExcursionResponse>> {
    return this.api.get<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/detail/${id}`);
  }

  getExcursionStats(): Observable<ApiResponse<OrderExcursionStats>> {
    return this.api.get<ApiResponse<OrderExcursionStats>>(`${this.prefix}/stats`);
  }

  updateExcursionOrder(id: string, data: UpdateOrderExcursion): Observable<ApiResponse<OrderExcursionResponse>> {
    return this.api.patch<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/update/${id}`, data);
  }

  deleteExcursionOrder(id: string): Observable<ApiResponse<OrderExcursionResponse>> {
    return this.api.delete<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/delete/${id}`);
  }

  purgeExcursionOrder(id: string): Observable<ApiResponse<OrderExcursionResponse>> {
    return this.api.delete<ApiResponse<OrderExcursionResponse>>(`${this.prefix}/purge/${id}`);
  }

}
