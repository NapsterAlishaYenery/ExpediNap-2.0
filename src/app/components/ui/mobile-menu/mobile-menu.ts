import { Component, inject} from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MobileMenuService } from '../../../core/services/mobile/mobile-menu';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, IconsModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {
 public menuService = inject(MobileMenuService);

  readonly menuItems = [
    { name: 'Home', icon: 'house', route: '/' },
    { name: 'Excursions', icon: 'compass', route: '/excursions' },
    { name: 'Yacht', icon: 'ship', route: '/yachts' },
    { name: 'Transfers', icon: 'car', route: '/transfers' },
    { name: 'Blogs', icon: 'book-open', route: '/blogs' },
    { name: 'Contact', icon: 'message-circle', route: '/contact' },
  ];
}
