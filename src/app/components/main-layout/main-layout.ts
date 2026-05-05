import { Component, inject } from '@angular/core';
import { MobileMenuService } from '../../core/services/mobile/mobile-menu';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../home/top-bar/top-bar';
import { NavBar } from '../home/nav-bar/nav-bar';
import { Footer } from '../home/footer/footer';
import { MobileMenu } from '../ui/mobile-menu/mobile-menu';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    TopBar,
    NavBar,
    Footer,
    MobileMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  isMenuOpen = false;
  isModalOpen = false;

  public menuService = inject(MobileMenuService);
  currentRoute = 'Home'; // Esto lo puedes dinamizar luego

}
