import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, startWith } from 'rxjs';

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
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }
  private updateBreadcrumbs() {
    const root = this.router.routerState.snapshot.root;
    const breadcrumbs: BreadcrumbItem[] = [];
    this.addBreadcrumb(root, [], breadcrumbs);
    this._breadcrumbs$.next(breadcrumbs);
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: BreadcrumbItem[]) {
    if (!route) return;

    const routeUrl = parentUrl.concat(route.url.map(url => url.path));

    if (route.data && route.data['breadcrumb']) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url: '/' + routeUrl.join('/')
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
