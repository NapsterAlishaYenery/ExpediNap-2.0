import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { BlogResponse, CreateBlogRequest, UpdateBlogRequest } from '../../interfaces/blog/blog.interface';
import { HttpParams } from '@angular/common/http';
import { ApiServices } from '../api/api-services';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private api = inject(ApiServices);
  private prefix = 'blogs';

  constructor() { }

  /**
   * Obtener todos los blogs con filtros opcionales
   */
  getBlogs(
    page: number = 1,
    limit: number = 12,
    title?: string,
    category?: string,
    type?: string,
    author?: string
  ): Observable<ApiResponse<BlogResponse[]>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (title) params = params.set('title', title);
    if (category) params = params.set('category', category);
    if (type) params = params.set('type', type);
    if (author) params = params.set('author', author);

    return this.api.get<ApiResponse<BlogResponse[]>>(`${this.prefix}/all`, params);
  }

/**
   * Obtener detalle por ID (/detail/:id)
   */
  getBlogById(id: string): Observable<ApiResponse<BlogResponse>> {
    return this.api.get<ApiResponse<BlogResponse>>(`${this.prefix}/detail/${id}`);
  }

  /**
   * Obtener detalle por Slug (/post/:slug)
   * Ideal para la vista pública y SEO
   */
  getBlogBySlug(slug: string): Observable<ApiResponse<BlogResponse>> {
    return this.api.get<ApiResponse<BlogResponse>>(`${this.prefix}/post/${slug}`);
  }

  /**
   * Crear un nuevo artículo
   */
  createBlog(formData: FormData): Observable<ApiResponse<BlogResponse>> {
    return this.api.post<ApiResponse<BlogResponse>>(`${this.prefix}/create`, formData);
  }

  /**
   * Actualizar artículo sus campos texto
   */
  updateBlog(id: string, data: UpdateBlogRequest): Observable<ApiResponse<BlogResponse>> {
    return this.api.patch<ApiResponse<BlogResponse>>(`${this.prefix}/update/${id}`, data);
  }

   /**
   * Actualizar artículo su contenido en el HTML con imagenes
   */
  updateBlogHtmlContent(id: string, formData: FormData): Observable<ApiResponse<BlogResponse>> {
    return this.api.patch<ApiResponse<BlogResponse>>(`${this.prefix}/update-content/${id}`, formData);
  }

  /**
   * Eliminar artículo
   */
  deleteBlog(id: string): Observable<ApiResponse<BlogResponse>> {
    return this.api.delete<ApiResponse<BlogResponse>>(`${this.prefix}/delete/${id}`);
  }
}
