import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoConfig } from '../../interfaces/seo/seo.interface';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private dom = inject(DOCUMENT);

  // Imagen fallback predeterminada de ExpediNap
  private readonly DEFAULT_IMAGE = 'https://res.cloudinary.com/dfwpolska/image/upload/v1776901038/social-imag.webp';

  setPageSeo(config: SeoConfig): void {
    const imageUrl = config.image || this.DEFAULT_IMAGE;
    const ogType = config.type || 'website';

    const robotsContent = config.robots || 'index, follow';

    // 1. Título de la pestaña
    this.titleService.setTitle(config.title);

    // 2. Metadatos Estándar (Google, Bing, etc.)
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ name: 'robots', content: robotsContent });

    // Convierte el array ['excursions', 'punta cana'] a string "excursions, punta cana"
    if (config.keywords && config.keywords.length > 0) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // 3. Autor (para artículos o posts de blog)
    if (config.author) {
      this.metaService.updateTag({ name: 'author', content: config.author });
    }

    // 4. Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
    this.metaService.updateTag({ property: 'og:site_name', content: 'ExpediNap' });
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: config.url });
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });

    // 5. Twitter Cards (Twitter / X)
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });

    // 6. Canonical URL (Evita duplicados en Google)
    this.updateCanonical(config.url);
  }

  /**
   * Método privado para manipular el DOM directamente, 
   * ya que MetaService de Angular no soporta etiquetas <link>.
   */
  private updateCanonical(url: string): void {
    if (!url) {
      console.warn('[SEO SERVICE] ⚠️ Advertencia: updateCanonical recibió una URL vacía o undefined!');
      return;
    }

    let link: HTMLLinkElement | null = this.dom.querySelector("link[rel='canonical']");

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.dom.head.appendChild(link);
    }
  }
}
