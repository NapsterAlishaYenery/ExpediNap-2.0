import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MobileMenuService } from '../../../core/services/mobile/mobile-menu';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, IconsModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {
  public menuService = inject(MobileMenuService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  public isScrollingDown = false;
  private lastScrollPosition = 0;

  readonly menuItems = [
    { name: 'Home', icon: 'house', route: '/' },
    { name: 'Excursions', icon: 'compass', route: '/excursions' },
    { name: 'Yacht', icon: 'ship', route: '/yachts' },
    { name: 'Transfers', icon: 'car', route: '/transfers' },
    { name: 'Blogs', icon: 'book-open', route: '/blogs' },
    { name: 'Contact', icon: 'message-circle', route: '/contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) return; // Evita acceder a 'window' en el servidor (SSR)

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > this.lastScrollPosition && currentScroll > 40) {
      this.isScrollingDown = true;
    } else {
      this.isScrollingDown = false;
    }
    this.lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
  }
}
