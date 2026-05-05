import { Component, HostListener, inject, OnInit } from '@angular/core';
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
export class NavBar implements OnInit{
  
  // injectamos el resrvixio para cambiar de tema
  private themeService = inject(ThemeService);
  
  // Inyectamos el servicio
  private menuService = inject(MobileMenuService);

  isScrollingDown = false;
  lastScrollTop = 0;
  isDarkMode = false;

  ngOnInit() {
    // Sincronizamos el estado inicial del botón con el servicio
    this.isDarkMode = this.themeService.isDarkMode();
  }

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
    this.isScrollingDown = st > this.lastScrollTop && st > 50;
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  toggleTheme() {
    // El servicio se encarga de la lógica y el LocalStorage
    this.isDarkMode = this.themeService.toggleTheme();
  }

  openMobileMenu() {
    // Aquí disparas tu modal que ya tienes listo
    this.menuService.open();
  }
}
