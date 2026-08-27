import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private platformId = inject(PLATFORM_ID);
  private apiService = inject(ApiServices); // 👈 Inyectar

  constructor() { }

  //Guardar el usuario si exite
  saveCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  //Obtener el usuario si exite
  getCurrentUser(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('currentUser');
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  }

  //Remover el usuario si se hace logout
  removeCurrentUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  //verifica si el token existe y si exisste es un usuario login
  isAuthenticated(): boolean {
    // 🔄 Antes: !!this.getToken();
    // ✅ Ahora: Verificar si existe usuario en localStorage
    return !!this.getCurrentUser();
  }

  // ============================================
  // ✅ MODIFICAR - Ahora usa el usuario de localStorage
  // ============================================
  getLoggedInUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getCurrentUser();
      // 🔄 Antes: user ? user.id_usuario : null
      // ✅ Ahora: user ? user._id : null (MongoDB usa _id)
      return user ? user._id : null;
    }
    return null;
  }


  getUserRole(): string | null {
    // 🔄 Antes: decodificaba el token
    // ✅ Ahora: toma el rol del usuario en localStorage
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Verifica si el usuario actual es un administrador.
   * @returns true si el rol es 'admin' (ID 2), false en caso contrario.
   */
  /**
    * Verifica si el usuario actual es un administrador.
    */
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'admin';
  }

  isSuperAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'super-admin';
  }

  logout(): void {
    // 1. Limpiar localStorage
    this.removeCurrentUser();

    // 2. Llamar al backend para eliminar la cookie
    this.apiService.post('/users/logout', {})
    .pipe(first())
    .subscribe({
      next: () => {
        console.log('✅ Logout exitoso');
      },
      error: (error) => {
        console.warn('⚠️ Error en logout (backend):', error);
        // Aunque falle, el localStorage ya está limpio
      }
    });
  }
}
