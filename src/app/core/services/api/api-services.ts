import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  constructor(){}

  //Metodos del servicio HTTP

  //METODO GET
  get<T>(endpoint: string, params?: HttpParams){
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params,
      withCredentials: true, // incluye cookies en la petición
    });
  }

  //METODO POST
  post<T>(endpoint: string, body: any){
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      withCredentials: true, // incluye cookies en la petición
    });
  }

  //METODO PATCH
  patch<T>(endpoint: string, body: any){
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
      withCredentials: true,  // incluye cookies en la petición
    });
  }

  //METODO DELETE
  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      withCredentials: true,  //  incluye cookies en la petición
    });
  }
}

//NOTA: Deobo cambiar la forma de guardar el token en un futuro
