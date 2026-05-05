import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-chat',
  imports: [],
  templateUrl: './whatsapp-chat.html',
  styleUrl: './whatsapp-chat.css',
})
export class WhatsappChat {

  openWhatsApp() {
    const phone = '18098369303';
    const message = 'Hello ExpediNap, I would like to request information.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
