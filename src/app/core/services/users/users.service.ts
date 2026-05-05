import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { LoginResponse, PasswordReseteResponse, RegisterRequest, UpdateUserRequest, UserResponse } from '../../interfaces/user/user.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api = inject(ApiServices);
  private prefix = 'users';

  /**
   * Registrar nuevo usuario
   */
  register(data: RegisterRequest): Observable<ApiResponse<UserResponse>> {
    return this.api.post<ApiResponse<UserResponse>>(`${this.prefix}/register`, data);
  }

  /**
   * Iniciar Sesión
   */
  login(username: string, password: string): Observable<ApiResponse<LoginResponse>> {
    return this.api.post<ApiResponse<LoginResponse>>(`${this.prefix}/login`, { username, password });
  }

  /**
   * Obtener perfil del usuario actual (basado en token)
   */
  getProfile(): Observable<ApiResponse<UserResponse>> {
    return this.api.get<ApiResponse<UserResponse>>(`${this.prefix}/profile`);
  }

  /**
   * Actualizar perfil
   */
  updateProfile(data: UpdateUserRequest): Observable<ApiResponse<UserResponse>> {
    return this.api.patch<ApiResponse<UserResponse>>(`${this.prefix}/update`, data);
  }

  /**
   * Obtener lista de usuarios (Admin only)
   */
  getUsers(
    page: number = 1, 
    limit: number = 12,
    name?: string,
    username?: string,
    email?: string,
    role?: string
  ): Observable<ApiResponse<UserResponse[]>> {
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (name) params = params.set('name', name);
    if (username) params = params.set('username', username);
    if (email) params = params.set('email', email);
    if (role) params = params.set('role', role);

    return this.api.get<ApiResponse<UserResponse[]>>(`${this.prefix}/all`, params);
  }

  passwordRequestResetCode(email: string): Observable<PasswordReseteResponse>{
    return this.api.post<PasswordReseteResponse>(`${this.prefix}/forgot-password`, {email});
  }

  resetPassword(data: { email: string; code: string; newPassword: string }): Observable<PasswordReseteResponse> {
  return this.api.post<PasswordReseteResponse>(`${this.prefix}/reset-password`, data);
}
}
