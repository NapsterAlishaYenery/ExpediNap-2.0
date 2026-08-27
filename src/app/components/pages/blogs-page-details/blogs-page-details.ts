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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImagesModel } from '../../../core/interfaces/shared/image.interface';

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
