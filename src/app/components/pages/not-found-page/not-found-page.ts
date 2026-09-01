import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconsModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage implements OnInit {
  private seoService = inject(SeoService);
  private router = inject(Router);

  ngOnInit(): void {

    // Captura el dominio base + la ruta no encontrada donde cayó el usuario
    const currentUrl = `https://www.expedinap.com${this.router.url}`;

    this.seoService.setPageSeo({
      title: 'Page Not Found | 404 | ExpediNap',
      description: 'The page you are looking for does not exist or has been moved.',
      url: currentUrl,
      robots: 'noindex, nofollow' // Asegúrate de que tu SeoService configure la etiqueta <meta name="robots">
    });
  }
}
