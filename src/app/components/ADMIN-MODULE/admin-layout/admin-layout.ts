import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../core/services/theme-service/theme.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';
import { Auth } from '../../../core/services/auth/auth';
import { Breadcrumb } from '../../ui/breadcrumb/breadcrumb';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, IconsModule, RouterLink, Breadcrumb, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private themeService = inject(ThemeService);
  private auth = inject(Auth);
  private router = inject(Router);

  isSidebarCollapsed = signal(false);
  isDarkMode = signal(this.themeService.isDarkMode());

  // LEEMOS EL USUARIO REAL DE TU SERVICIO AUTH
  currentUser = signal(this.auth.getCurrentUser());

  // Menú reestructurado con secciones de Ecommerce y Gestión
  menuGroups = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', icon: 'layout-grid', route: '/admin/dashboard-home', badge: null },
      ]
    },
    {
      title: 'SALES ORDERS',
      items: [
        { name: 'Excursions', icon: 'compass', route: '/admin/excursions', badge: 3 },
        { name: 'Yachts', icon: 'ship', route: '/admin/yachts', badge: 1 },
        { name: 'Transfers', icon: 'car', route: '/admin/transfers', badge: null },
      ]
    },
    {
      title: 'INVENTORY MGMT',
      items: [
        { name: 'Manage Excursions', icon: 'shopping-bag', route: '/admin/manage-excursions', badge: null },
        { name: 'Manage Yachts', icon: 'anchor', route: '/admin/manage-yachts', badge: null },
      ]
    },
    {
      title: 'SYSTEM & CONTENT',
      items: [
        { name: 'Blogs', icon: 'book-open', route: '/admin/blogs', badge: null },
        { name: 'NCF Pool', icon: 'file-text', route: '/admin/ncf', badge: 12 },
        { name: 'Users', icon: 'users', route: '/admin/users', badge: null },
        { name: 'Settings', icon: 'settings', route: '/admin/settings', badge: null },
      ]
    }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleTheme() {
    this.isDarkMode.set(this.themeService.toggleTheme());
  }

  onLogout() {
    this.auth.removeToken();
    this.auth.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
