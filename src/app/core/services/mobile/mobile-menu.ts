import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isOpen$ = this.isOpenSubject.asObservable();

  open() {
    this.isOpenSubject.next(true);
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    this.isOpenSubject.next(false);
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  toggle() {
    if (this.isOpenSubject.value) {
      this.close();
    } else {
      this.open();
    }
  }
}
