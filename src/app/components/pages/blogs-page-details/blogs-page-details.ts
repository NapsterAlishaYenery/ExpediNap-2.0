import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogResponse } from '../../../core/interfaces/blog/blog.interface';
import { BlogService } from '../../../core/services/blogs/blog.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../core/icons.module';
import { Breadcrumb } from '../../ui/breadcrumb/breadcrumb';
import { Badge } from '../../ui/badge/badge';
import { Button } from '../../ui/button/button';
import { ImageGallery } from '../../ui/image-gallery/image-gallery';
import { DomSanitizer, SafeHtml,} from '@angular/platform-browser';
import { ImagesModel } from '../../../core/interfaces/shared/image.interface';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-blogs-page-details',
  imports: [CommonModule, IconsModule, Breadcrumb, Badge, Button, ImageGallery, RouterLink],
  templateUrl: './blogs-page-details.html',
  styleUrl: './blogs-page-details.css',
})
export class BlogsPageDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private destroy$ = new Subject<void>();

  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer); // Inyecta el servicio

  // Agregamos esta propiedad para el componente de galería
  formattedImages?: ImagesModel;

  blog?: BlogResponse;
  isLoading = true;
  safeContent?: SafeHtml;

  ngOnInit() {
    // Escuchamos el slug de la URL
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.fetchBlog(slug);
      }
    });
  }

  fetchBlog(slug: string) {
    this.blogService.getBlogBySlug(slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.blog = res.data;

          // 🔥 METADATOS - Después de cargar el blog
          this.updateMetadata();

          // AQUÍ LIMPIAMOS EL HTML
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);

          // Transformamos la imagen simple del blog al objeto que espera la galería
          this.formattedImages = {
            main: this.blog.image, // ✅ Ya es ImageItem
            gallery: [] // ✅ Array vacío de ImageItem (no mostrará miniaturas)
          };
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/blogs']);
          this.isLoading = false;
        }
      });
  }

  // 🔥 NUEVO: Método para actualizar metadatos
  private updateMetadata(): void {
    if (!this.blog) return;

    const title = this.blog.meta_title || `${this.blog.title} | Travel Blog | ExpediNap`;
    const description = this.blog.meta_description ||
      `Read our blog about ${this.blog.title}. Discover tips, recommendations, and insights about Punta Cana and the Dominican Republic.`;

    // Si hay keywords en DB se usan, si no, se crea el array de fallback
    const keywords = this.blog.keywords?.length
      ? this.blog.keywords
      : [this.blog.title, 'Punta Cana blog', 'Dominican Republic travel', ...(this.blog.category || [])];

    this.seoService.setPageSeo({
      title,
      description,
      url: `https://www.expedinap.com/blogs/${this.blog.slug}`,
      keywords,
      image: this.blog.image?.url,
      type: 'article'
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
