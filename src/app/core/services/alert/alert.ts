import { Injectable } from '@angular/core';
import { AlertaState } from '../../interfaces/alert/alerta-state.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private alertSubject = new BehaviorSubject<AlertaState>({
    variant: 'default',
    title: '',
    description: ''
  });

  private visibleSubject = new BehaviorSubject<boolean>(false);
  alert$ = this.alertSubject.asObservable(); 
  visible$ = this.visibleSubject.asObservable(); 


  showAlert(
    variant: AlertaState['variant'],
    title: string,
    description: string,
    duration: number = 5000) {


    this.alertSubject.next({ variant, title, description });


    this.visibleSubject.next(true);

    setTimeout(() => {
      this.visibleSubject.next(false);
    }, duration);
  }
}
