import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: '**',
  //   renderMode: RenderMode.Prerender
  // }
 {
    path: '',
    renderMode: RenderMode.Server  // Home
  },
  {
    path: 'excursions',
    renderMode: RenderMode.Server
  },
  {
    path: 'excursions/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'yachts',
    renderMode: RenderMode.Server
  },
  {
    path: 'yachts/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'blogs',
    renderMode: RenderMode.Server
  },
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'transfers',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'faq',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Client
  },
  {
    path: 'cookie-policy',
    renderMode: RenderMode.Client
  },
  {
    path: 'terms-and-conditions',
    renderMode: RenderMode.Client
  },
  {
    path: 'cancellation-policy',
    renderMode: RenderMode.Client
  },

  // --- Admin y Autenticación - CSR (Client) ---
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'password-recovery',
    renderMode: RenderMode.Client
  },
  {
    path: 'register',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },

  // --- Fallback - 404 ---
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
