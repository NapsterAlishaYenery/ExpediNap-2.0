import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';
import { IconsModule } from '../../../core/icons.module';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-mobile-menu',
  imports: [Button, IconsModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {
  @Input() isOpen = false;
  @Input() activeRoute = '/'; // Para marcar el link seleccionado
  @Output() onClose = new EventEmitter<void>();

  menuItems = [
    { name: 'Home', icon: 'house', route: '/' },
    { name: 'Excursions', icon: 'compass', route: '/excursions' },
    { name: 'Yacht', icon: 'ship', route: '/yachts' },
    { name: 'Transfers', icon: 'car', route: '/transfers' },
    { name: 'Blogs', icon: 'book-open', route: '/blogs' },
    { name: 'Contact', icon: 'message-circle', route: '/contact' }
  ];

  close() {
    this.onClose.emit();
  }

}
