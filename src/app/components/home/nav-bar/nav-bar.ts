import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileMenuService } from '../../../core/services/mobile/mobile-menu';
import { ThemeService } from '../../../core/services/theme-service/theme.service';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [IconsModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  // Inyecciones
  public themeService = inject(ThemeService); // Público para usarlo en el HTML
  public menuService = inject(MobileMenuService);

  private platformId = inject(PLATFORM_ID);

  // Estados con Signals
  isScrollingDown = signal(false);
  private lastScrollTop = 0;

  menuItems = [
    { name: 'Home', icon: 'house', route: '/' },
    { name: 'Excursions', icon: 'compass', route: '/excursions' },
    { name: 'Yacht', icon: 'ship', route: '/yachts' },
    { name: 'Transfers', icon: 'car', route: '/transfers' },
    { name: 'Blogs', icon: 'book-open', route: '/blogs' },
    { name: 'Contact', icon: 'message-circle', route: '/contact' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      this.isScrollingDown.set(st > this.lastScrollTop && st > 50);
      this.lastScrollTop = st <= 0 ? 0 : st;
    }
  }

  toggleTheme() {
    // Solo llamamos a la acción, el signal darkMode() del servicio cambiará solo
    this.themeService.toggleTheme();
  }

  openMobileMenu() {
    this.menuService.open();
  }
}
