import { Component, inject, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ThemeService } from '../../../core/services/theme-service/theme.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';
import { Auth } from '../../../core/services/auth/auth';
import { Breadcrumb } from '../../ui/breadcrumb/breadcrumb';
import { OrderExcursionService } from '../../../core/services/orders-services/order-excursion/order-excursion.service';
import { OrderYachtService } from '../../../core/services/orders-services/order-yacht/order-yacht.service';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { OrderTransferService } from '../../../core/services/orders-services/order-transfer/order-transfer.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, IconsModule, RouterLink, Breadcrumb, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit, OnDestroy {
 public themeService = inject(ThemeService);
  private auth = inject(Auth);
  private router = inject(Router);
  private excursionOrderService = inject(OrderExcursionService);
  private yachtOrderService = inject(OrderYachtService);
  private transferOrderService = inject(OrderTransferService);
  private readonly destroy$ = new Subject<void>();

  isSidebarCollapsed = signal(false);
  isScrollingDown = signal(false);
  private lastScrollTop = 0;

  // LEEMOS EL USUARIO REAL DE TU SERVICIO AUTH
  currentUser = signal(this.auth.getCurrentUser());

  // Badges dinámicos para notificaciones
  pendingExcursions = signal(0);
  pendingYachts = signal(0);
  pendingTransfers = signal(0);

  // Menú con badges dinámicos
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
        { name: 'Excursions', icon: 'compass', route: '/admin/excursions', badge: this.pendingExcursions },
        { name: 'Yachts', icon: 'ship', route: '/admin/yachts', badge: this.pendingYachts },
        { name: 'Transfers', icon: 'car', route: '/admin/transfers', badge: this.pendingTransfers },
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
        { name: 'NCF Pool', icon: 'file-text', route: '/admin/ncf', badge: null },
        { name: 'Users', icon: 'users', route: '/admin/users', badge: null },
        { name: 'Settings', icon: 'settings', route: '/admin/settings', badge: null },
      ]
    }
  ];

  ngOnInit(): void {
    this.loadPendingCounts();
    this.startAutoRefresh(); // 👈 Auto-actualización cada 30 segundos
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Carga inicial de conteos pendientes
  loadPendingCounts() {
    // Cargar excursiones pendientes
    this.excursionOrderService.getAllExcursionOrders(1, 100, 'pending', '', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingExcursions.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingExcursions.set(0)
      });

    // Cargar yates pendientes
    this.yachtOrderService.getAllOrderYachts(1, 100, 'pending', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingYachts.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingYachts.set(0)
      });

    // Cargar transfers pendientes
    this.transferOrderService.getAllOrderTransfer(1, 100, 'pending', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingTransfers.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingTransfers.set(0)
      });
  }

  // Auto-actualización cada 30 segundos
  startAutoRefresh() {
    interval(30000) // 30 segundos
      .pipe(
        takeUntil(this.destroy$),
        switchMap(async () => {
          await this.refreshPendingCounts();
        })
      )
      .subscribe();
  }

  // Refrescar solo los conteos pendientes (sin recargar la página)
  async refreshPendingCounts() {
    // Excursiones
    this.excursionOrderService.getAllExcursionOrders(1, 100, 'pending', '', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingExcursions.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingExcursions.set(0)
      });

    // Yates
    this.yachtOrderService.getAllOrderYachts(1, 100, 'pending', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingYachts.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingYachts.set(0)
      });

    // Transfers
    this.transferOrderService.getAllOrderTransfer(1, 100, 'pending', '', '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pendingTransfers.set(res.pagination?.totalItems || res.data?.length || 0);
        },
        error: () => this.pendingTransfers.set(0)
      });
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  // Lógica para ocultar/mostrar top bar al hacer scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrollingDown.set(st > this.lastScrollTop && st > 50);
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}