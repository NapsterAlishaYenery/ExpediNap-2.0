import { Component, HostListener, inject, signal } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../../ui/button/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileMenuService } from '../../../core/services/mobile/mobile-menu';
import { ThemeService } from '../../../core/services/theme-service/theme.service';

@Component({
  selector: 'app-nav-bar',
  imports: [IconsModule,Button, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  // Inyecciones
  public themeService = inject(ThemeService); // Público para usarlo en el HTML
  private menuService = inject(MobileMenuService);

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
    const st = window.pageYOffset || document.documentElement.scrollTop;
    // Actualizamos el signal
    this.isScrollingDown.set(st > this.lastScrollTop && st > 50);
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  toggleTheme() {
    // Solo llamamos a la acción, el signal darkMode() del servicio cambiará solo
    this.themeService.toggleTheme();
  }

  openMobileMenu() {
    this.menuService.open();
  }
}
