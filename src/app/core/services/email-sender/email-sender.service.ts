import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api/api-services';
import { EmailSenderBase, EmailSenderResponse } from '../../interfaces/contact-email/email.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {

  private api = inject(ApiServices);
  private prefix = 'email';

  constructor(){}

  sendEmailContact(data: EmailSenderBase): Observable<ApiResponse<EmailSenderResponse>>{
    return this.api.post<ApiResponse<EmailSenderResponse>>(`${this.prefix}/send`, data)
  }
}
