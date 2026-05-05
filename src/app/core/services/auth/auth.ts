import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode }from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private platformId = inject(PLATFORM_ID);

  constructor() { }

  //Si existe un token en localstore obtenerlo sino mandar null
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  //Si se envia el token guardarlo en localstore para verificar despues 
  savetoken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  //Si se desea borrar el token del localstore
  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken')
    }
  }

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
    return !!this.getToken();
  }

  getLoggedInUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getCurrentUser();
      return user ? user.id_usuario : null;
    }
    return null;
  } 

  /**
   * Decodifica el token para obtener el payload.
   * @returns El payload del token o null si no hay token o es inválido.
   */
  getDecodedToken(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (token) {
        try {
          return jwtDecode(token);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Obtiene el rol del usuario a partir del token.
   * @returns El string del rol ('admin' o 'user')
   */
  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    // En tu controlador login: jwt.sign({ ..., role: usuarioLogin.role }, ...)
    return decodedToken ? decodedToken.role : null;
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

}
