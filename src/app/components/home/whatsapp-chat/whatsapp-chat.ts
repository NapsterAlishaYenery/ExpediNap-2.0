import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-whatsapp-chat',
  imports: [],
  templateUrl: './whatsapp-chat.html',
  styleUrl: './whatsapp-chat.css',
})
export class WhatsappChat {

  private platformId = inject(PLATFORM_ID);

  openWhatsApp() {
    if (isPlatformBrowser(this.platformId)) {
      const phone = '18098369303';
      const message = 'Hello ExpediNap, I would like to request information.';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }
}
