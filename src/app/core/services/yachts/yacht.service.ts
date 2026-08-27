import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { HttpParams } from '@angular/common/http';
import { CreateYachtRequest, UpdateYachtRequest, YachtResponse } from '../../interfaces/yacht/yacht.interface';
import { SimpleListResponse } from '../../interfaces/shared/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class YachtService {
  private api = inject(ApiServices);
  private prefix = 'yachts'; // Asegúrate que este sea el prefijo en tu backend

  constructor() { }

  /**
   * Obtener todos los yates
   */
  getYachts(
    page: number = 1,
    limit: number = 12,
    name?: string,
    sortBy?: string,
    order?: 'asc' | 'desc'
  ): Observable<ApiResponse<YachtResponse[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (name) params = params.set('name', name);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (order) params = params.set('order', order);

    return this.api.get<ApiResponse<YachtResponse[]>>(`${this.prefix}/all`, params);
  }

  /**
   * Detalle de un yate por ID
   */
  getYachtById(id: string): Observable<ApiResponse<YachtResponse>> {
    return this.api.get<ApiResponse<YachtResponse>>(`${this.prefix}/detail/${id}`);
  }

  /**
   * OBTENER POR SLUG (SEO)
   */
  getYachtBySlug(slug: string): Observable<ApiResponse<YachtResponse>> {
    return this.api.get<ApiResponse<YachtResponse>>(`${this.prefix}/slug/${slug}`);
  }

  /**
   * Crear un nuevo yate
   */
  createYacht(formData: FormData): Observable<ApiResponse<YachtResponse>> {
    return this.api.post<ApiResponse<YachtResponse>>(`${this.prefix}/create`, formData);
  }

  /**
   * Actualizar yate existente
   */
  updateYacht(id: string, data: UpdateYachtRequest): Observable<ApiResponse<YachtResponse>> {
    return this.api.patch<ApiResponse<YachtResponse>>(`${this.prefix}/update/${id}`, data);
  }

  /**
   * Eliminar yate
   */
  deleteYacht(id: string): Observable<ApiResponse<YachtResponse>> {
    return this.api.delete<ApiResponse<YachtResponse>>(`${this.prefix}/delete/${id}`);
  }

  /**
  * Get all for select solo nombre, id
  */
  getYachtsForSelect(): Observable<ApiResponse<SimpleListResponse[]>> {
    return this.api.get<ApiResponse<SimpleListResponse[]>>(`${this.prefix}/all-for-select`);
  }

  /**
 * Adregar imagenes o video a una galeria de un yate
 */
  addYachtGalleryImages(formData: FormData, id: string): Observable<ApiResponse<YachtResponse>> {
    return this.api.post<ApiResponse<YachtResponse>>(`${this.prefix}/${id}/gallery`, formData);
  }


  /**
   * Eliminar Imagen de la galeria del yate 
   */
  deleteYachtGalleryImage(id: string, index: number): Observable<ApiResponse<YachtResponse>> {
    return this.api.delete<ApiResponse<YachtResponse>>(`${this.prefix}/${id}/gallery/${index}`);
  }


  /**
 * Actualizar yate existente Cambiar la imagen main por la de una galeria
 */
  swapYachtMainImage(id: string, index: number): Observable<ApiResponse<YachtResponse>> {
    return this.api.patch<ApiResponse<YachtResponse>>(`${this.prefix}/${id}/swap-main`, { index: index });
  }

}
