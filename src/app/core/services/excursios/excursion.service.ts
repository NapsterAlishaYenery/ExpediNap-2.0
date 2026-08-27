import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { CreateExcursionRequest, ExcursionResponse, UpdateExcursionRequest } from '../../interfaces/excursion/excursion.interface';
import { SimpleListResponse } from '../../interfaces/shared/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class ExcursionService {
  private api = inject(ApiServices);
  private prefix = 'excursions'; // El endpoint en tu backend de Node

  constructor() { }

  /**
   * Obtener todas las excursiones (con paginación opcional)
   */
  getExcursions(
    page: number = 1,
    limit: number = 12,
    name?: string,
    category?: string,
    location?: string,
    isFeatured?: boolean
  ): Observable<ApiResponse<ExcursionResponse[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);
    if (location) params = params.set('location', location);
    if (isFeatured !== undefined) params = params.set('isFeatured', isFeatured.toString());

    return this.api.get<ApiResponse<ExcursionResponse[]>>(`${this.prefix}/all`, params);
  }

  /**
   * Obtener una excursión por su ID
   */
  getExcursionById(id: string): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.get<ApiResponse<ExcursionResponse>>(`${this.prefix}/detail/${id}`);
  }

  /**
   * OBTENER POR SLUG (SEO)
   * Este es el método que usaremos en la vista pública de detalles
   */
  getExcursionBySlug(slug: string): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.get<ApiResponse<ExcursionResponse>>(`${this.prefix}/slug/${slug}`);
  }

  /**
   * Crear una nueva excursión
   */
  createExcursion(formData: FormData): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.post<ApiResponse<ExcursionResponse>>(`${this.prefix}/create`, formData);
  }

  addGalleryImages(formData: FormData, id: string,): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.post<ApiResponse<ExcursionResponse>>(`${this.prefix}/${id}/gallery`, formData);
  }

  /**
   * Actualizar una excursión existente
   */
  updateExcursion(id: string, data: UpdateExcursionRequest): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.patch<ApiResponse<ExcursionResponse>>(`${this.prefix}/update/${id}`, data);
  }

  swapImageWithMain(id: string, index: number): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.patch<ApiResponse<ExcursionResponse>>(`${this.prefix}/${id}/swap-main`, { index: index });
  }

  /**
   * Eliminar una excursión
   */
  deleteExcursion(id: string): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.delete<ApiResponse<ExcursionResponse>>(`${this.prefix}/delete/${id}`);
  }



  /**
   * Eliminar una excursión
   */
  deleteImageFromGallery(id: string, index: number): Observable<ApiResponse<ExcursionResponse>> {
    return this.api.delete<ApiResponse<ExcursionResponse>>(`${this.prefix}/${id}/gallery/${index}`);
  }


  /**
 * Get all for select solo nombre, id
 */
  getExcursionsForSelect(): Observable<ApiResponse<SimpleListResponse[]>> {
    return this.api.get<ApiResponse<SimpleListResponse[]>>(`${this.prefix}/all-for-select`);
  }
}
