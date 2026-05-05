import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { WeatherBase } from '../../interfaces/weather/weather.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private api = inject(ApiServices);
  private prefix = "weather";

  constructor(){}


  getWeather(city: string = "Punta Cana"): Observable<ApiResponse<WeatherBase>>{
    let params = new HttpParams().set("city", city.toString())
    return this.api.get<ApiResponse<WeatherBase>>(`${this.prefix}/`, params);
  }
}
