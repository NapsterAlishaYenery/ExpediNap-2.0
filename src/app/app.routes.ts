import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { guardGuard } from './core/guard/guard-guard'; 
import { ExcursionsPage } from './components/pages/excursions-page/excursions-page';
import { BlogPage } from './components/pages/blog-page/blog-page';
import { YachtsPage } from './components/pages/yachts-page/yachts-page';
import { TransfersPage } from './components/pages/transfers-page/transfers-page';
import { ExcursionsPageDetails } from './components/pages/excursions-page-details/excursions-page-details';
import { YachtsPageDetails } from './components/pages/yachts-page-details.ts/yachts-page-details';
import { BlogsPageDetails } from './components/pages/blogs-page-details/blogs-page-details';
import { FaqPage } from './components/pages/faq-page/faq-page';
import { ContactPage } from './components/pages/contact-page/contact-page';
import { LegalPage } from './components/pages/legal-page/legal-page';
import { CANCELLATION_POLICY, COOKIE_POLICY, PRIVACY_POLICY, TERMS_CONDITIONS } from './core/constants/legal-data';
import { NotFoundPage } from './components/pages/not-found-page/not-found-page';
import { Register } from './components/ADMIN-MODULE/pages/register/register';
import { Login } from './components/ADMIN-MODULE/pages/login/login';
import { MainLayout } from './components/main-layout/main-layout';
import { AdminLayout } from './components/ADMIN-MODULE/admin-layout/admin-layout';
import { DashboardHome } from './components/ADMIN-MODULE/pages/dashboard-home/dashboard-home';
import { RecuperarPassword } from './components/ADMIN-MODULE/pages/recuperar-password/recuperar-password';
import { AdminExcursionOrders } from './components/ADMIN-MODULE/pages/admin-excursion-orders/admin-excursion-orders';
import { AdminYachtOrders } from './components/ADMIN-MODULE/pages/admin-yacht-orders/admin-yacht-orders';
import { AdminTransferOrders } from './components/ADMIN-MODULE/pages/admin-transfer-orders/admin-transfer-orders';
import { ManageExcursions } from './components/ADMIN-MODULE/pages/manage-excursions/manage-excursions';
import { ManageYachts } from './components/ADMIN-MODULE/pages/manage-yachts/manage-yachts';
import { ManageBlogs } from './components/ADMIN-MODULE/pages/manage-blogs/manage-blogs';
import { ManageNcf } from './components/ADMIN-MODULE/pages/manage-ncf/manage-ncf';
import { ManageUsers } from './components/ADMIN-MODULE/pages/manage-users/manage-users';


export const routes: Routes = [
  // --- GROUP 1: PUBLIC LAYOUT (Navbar, Topbar, Footer) ---
  {
    path: '',
    component: MainLayout,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: Home,
        title: 'ExpediNap | Punta Cana Excursions & Private Yacht Rentals'
      },
      {
        path: 'excursions',
        data: { breadcrumb: 'Excursions' },
        children: [
          {
            path: '',
            component: ExcursionsPage,
            title: 'Best Excursions in Punta Cana | ExpediNap Tours'
          },
          {
            path: ':slug',
            component: ExcursionsPageDetails,
            data: { breadcrumb: 'Detail' },
            title: 'ExpediNap | Excursion Detail'
          }
        ]
      },
      {
        path: 'yachts',
        data: { breadcrumb: 'Yachts' },
        children: [
          {
            path: '',
            component: YachtsPage,
            title: 'Private Yacht Rentals & Boat Charters Punta Cana | ExpediNap'
          },
          {
            path: ':slug',
            component: YachtsPageDetails,
            data: { breadcrumb: 'Detail' },
            title: 'ExpediNap | Yacht Detail'
          }
        ]
      },
      {
        path: 'blogs',
        data: { breadcrumb: 'Blogs' },
        children: [
          {
            path: '',
            component: BlogPage,
            title: 'Punta Cana Travel Blog & Tips | ExpediNap'
          },
          {
            path: ':slug',
            component: BlogsPageDetails,
            data: { breadcrumb: 'Detail' },
            title: 'ExpediNap | Blogs Detail'
          }
        ]
      },
      {
        path: 'transfers',
        component: TransfersPage,
        data: { breadcrumb: 'Transfers' },
        title: 'Private Airport Transfers Punta Cana | ExpediNap Transportation'
      },
      {
        path: 'faq',
        component: FaqPage,
        data: { breadcrumb: 'FAQ' },
        title: 'ExpediNap | FAQ'
      },
      {
        path: 'contact',
        component: ContactPage,
        data: { breadcrumb: 'Contact' },
        title: 'ExpediNap | Contact'
      },
      // --- LEGAL SECTION ---
      {
        path: 'privacy-policy',
        component: LegalPage,
        data: { breadcrumb: 'Privacy Policy', content: PRIVACY_POLICY },
        title: 'ExpediNap | Privacy Policy'
      },
      {
        path: 'cookie-policy',
        component: LegalPage,
        data: { breadcrumb: 'Cookie Policy', content: COOKIE_POLICY },
        title: 'ExpediNap | Cookie Policy'
      },
      {
        path: 'terms-and-conditions',
        component: LegalPage,
        data: { breadcrumb: 'Terms & Conditions', content: TERMS_CONDITIONS },
        title: 'ExpediNap | Terms & Conditions'
      },
      {
        path: 'cancellation-policy',
        component: LegalPage,
        data: { breadcrumb: 'Cancellation Policy', content: CANCELLATION_POLICY },
        title: 'ExpediNap | Cancellation Policy'
      }
    ]
  },
  
  // --- GROUP 2: INDEPENDENT ROUTES (No Layout) ---
  {
    path: 'login',
    component: Login,
    title: 'ExpediNap | Admin Login'
  },
  {
    path: 'password-recovery', // <-- NUEVA RUTA
    component: RecuperarPassword,
    title: 'ExpediNap | Recover Password'
  },
  {
    path: 'register',
    component: Register,
    title: 'ExpediNap | Admin Register',
    canActivate: [guardGuard] // Solo accesible para Admins logueados
  },

  // --- GROUP 3: DASHBOARD ROUTES (Admin Section) ---
  {
    path: 'admin',
    component: AdminLayout, // El layout que acabamos de crear
    canActivate: [guardGuard],       // Protegemos toda la rama
    data: { breadcrumb: 'Admin' }, // Raíz del breadcrumb en el dashboard
    children: [
      {
        path: 'dashboard-home',
        component: DashboardHome,
        title: 'Admin | General Dashboard',
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'excursions',
        component: AdminExcursionOrders,
        title: 'Admin | Manage Excursion Orders',
        data: { breadcrumb: 'Excursion Orders' }
      },
      {
        path: 'yachts',
        component: AdminYachtOrders,
        title: 'Admin | Manage Yacht Orders',
        data: { breadcrumb: 'Yacht Orders' }
      },
      {
        path: 'transfers', 
        component: AdminTransferOrders,
        title: 'Admin | Manage Transfer Orders',
        data: { breadcrumb: 'Transfer Orders' }
      },
      {
        path: 'manage-excursions', 
        component: ManageExcursions,
        title: 'Admin | Inventory - Excursions',
        data: { breadcrumb: 'Manage Excursions' }
      },
      {
        path: 'manage-yachts',
        component: ManageYachts,
        title: 'Admin | Inventory - Yachts',
        data: { breadcrumb: 'Manage Yachts' }
      },
      {
        path: 'blogs',
        component: ManageBlogs,
        title: 'Admin | Manage Blogs',
        data: { breadcrumb: 'Blogs' }
      },
      {
        path: 'ncf',
        component: ManageNcf,
        title: 'Admin | NCF Pool',
        data: { breadcrumb: 'NCF Pool' }
      },
      {
        path: 'users',
        component: ManageUsers,
        title: 'Admin | Manage Users',
        data: { breadcrumb: 'Users' }
      },
      {
        path: 'settings',
        component: Home,
        title: 'Admin | System Settings',
        data: { breadcrumb: 'Settings' }
      },
      // Redirección automática al entrar a /admin
      { path: '', redirectTo: 'dashboard-home', pathMatch: 'full' }
    ]
  },

 // --- WILDCARD ROUTE (404) ---
  {
    path: '**',
    component: NotFoundPage,
    title: '404 | Page Not Found'
  }
];





