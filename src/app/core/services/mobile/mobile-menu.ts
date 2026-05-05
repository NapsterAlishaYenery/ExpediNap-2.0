import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  
  // Observable que el componente MobileMenu escuchará
  isOpen$ = this.isOpenSubject.asObservable();

  open() {
    this.isOpenSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpenSubject.next(false);
    document.body.style.overflow = 'auto';
  }

  toggle() {
    if (this.isOpenSubject.value) {
      this.close();
    } else {
      this.open();
    }
  }
}
