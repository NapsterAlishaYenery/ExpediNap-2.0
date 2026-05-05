import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

// 1. Definimos la interfaz dentro del mismo archivo para que sea accesible
export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);
  
  // Usamos la interfaz aquí
  private _breadcrumbs$ = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: BreadcrumbItem[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: BreadcrumbItem[]) {
    if (!route) return;

    // Construimos la URL de este segmento
    const routeUrl = parentUrl.concat(route.url.map(url => url.path));

    // Si la ruta tiene la propiedad 'breadcrumb' en data, la agregamos
    if (route.data && route.data['breadcrumb']) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url: '/' + routeUrl.join('/')
      });
    }

    // Recursividad para los hijos
    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
