import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { GoogleReviewData } from '../../interfaces/review/google-review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private api = inject(ApiServices);
  private prefix = 'google';

  constructor() { }
  // metodo para google review
  // No olvides importar ApiResponse y GoogleReviewData
  getGoogleReviews(): Observable<ApiResponse<GoogleReviewData>> {
    return this.api.get<ApiResponse<GoogleReviewData>>(`${this.prefix}/review`);
  }
}
