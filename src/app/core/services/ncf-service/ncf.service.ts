import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { CreateBulkNcfsRequest, CreateBulkNcfsResponse, CreateNcfRequest, NcfResponse, NcfStatsItem } from '../../interfaces/fiscal-receipt-number/number-ncf.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NcfService {

  private api = inject(ApiServices);
  private prefix = 'ncf';

  createSingleNCF(data: CreateNcfRequest): Observable<ApiResponse<NcfResponse>> {
    return this.api.post<ApiResponse<NcfResponse>>(`${this.prefix}/save-single`, data);
  }

  createBulkNCF(data: CreateBulkNcfsRequest): Observable<ApiResponse<CreateBulkNcfsResponse>> {
    return this.api.post<ApiResponse<CreateBulkNcfsResponse>>(`${this.prefix}/save-bulke`, data);
  }

  getAllNcf(
    page: number = 1,
    limit: number = 50,
    tipoNcf?: string,
    estado?: string,
    ncf?: string,
  ): Observable<ApiResponse<NcfResponse[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (tipoNcf) params = params.set('tipoNcf', tipoNcf);
    if (estado) params = params.set('estado', estado);
    if (ncf) params = params.set('ncf', ncf);

    return this.api.get<ApiResponse<NcfResponse[]>>(`${this.prefix}/all`, params);
  }

  getStatas(): Observable<ApiResponse<NcfStatsItem>> {
    return this.api.get<ApiResponse<NcfStatsItem>>(`${this.prefix}/stats`);
  }

  deleteNcf(id: string): Observable<ApiResponse<NcfResponse>> {
    return this.api.delete<ApiResponse<NcfResponse>>(`${this.prefix}/delete/${id}`);
  }
}
