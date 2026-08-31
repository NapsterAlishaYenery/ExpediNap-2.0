import { Component } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  exploraLinks = [
    { name: 'Home', icon: 'house', route: '/' },
    { name: 'Excursions', icon: 'compass', route: '/excursions' },
    { name: 'Yacht', icon: 'ship', route: '/yachts' },
    { name: 'Transfers', icon: 'car', route: '/transfers' },
    { name: 'Blogs', icon: 'book-open', route: '/blogs' },
    { name: 'Contact', icon: 'message-circle', route: '/contact' }
  ];

  legalLinks = [
    { label: 'Terms and Conditions', route: '/terms-and-conditions' },
    { label: 'Privacy Policy', route: '/privacy-policy' },
    { label: 'Cookie Policy', route: '/cookie-policy' },
    { label: 'Cancellation Policy', route: '/cancellation-policy' },
    { label: 'FAQ', route: '/faq' }
  ];

  socials = [
    { name: 'Facebook', icon: 'bi-facebook', route: 'https://facebook.com/expedinap' },
    { name: 'Instagram', icon: 'bi-instagram', route: 'https://instagram.com/expedinap' },
    { name: 'WhatsApp', icon: 'bi-whatsapp', route: 'https://wa.me/8098369303' },
    { name: 'YouTube', icon: 'bi-youtube', route: 'https://www.youtube.com/@ExpediNap' }
  ];
}
