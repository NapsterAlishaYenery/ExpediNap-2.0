import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegalContent } from '../../../core/interfaces/legal-content/legal-content.interface';
import { IconsModule } from '../../../core/icons.module';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-legal-page',
  imports: [IconsModule],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.css',
})
export class LegalPage implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  content!: LegalContent;

 ngOnInit(): void {
    // Suscribirse a los datos de la ruta definidos en app.routes.ts
    this.route.data.subscribe(data => {
      this.content = data['content'];

      if (this.content) {
        // Obtenemos la ruta relativa actual (ej: 'privacy-policy')
        const currentPath = this.route.snapshot.routeConfig?.path || '';
        
        // Asignamos las meta tags dinámicamente según la página legal
        this.seoService.setPageSeo({
          title: `${this.content.title} | ExpediNap`,
          description: `Read the official ${this.content.title} for ExpediNap excursions and private transportation services in Punta Cana.`,
          url: `https://www.expedinap.com/${currentPath}`,
          keywords: [
            this.content.title.toLowerCase(),
            'expedinap legal',
            'punta cana excursion terms',
            'expedinap policies'
          ],
          type: 'website'
        });
      }
    });
  }
}

