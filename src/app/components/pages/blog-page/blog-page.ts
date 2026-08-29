import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../ui/pagination/pagination';
import { BlogCard } from '../../ui/blog-card/blog-card';
import { IconsModule } from '../../../core/icons.module';
import { BlogService } from '../../../core/services/blogs/blog.service';
import { BlogResponse } from '../../../core/interfaces/blog/blog.interface';
import { PaginationMetadata } from '../../../core/interfaces/shared/shared.interface';
import { Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-page',
  imports: [CommonModule, Pagination, BlogCard, IconsModule],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.css',
})
export class BlogPage implements OnInit, OnDestroy {

  private blogService = inject(BlogService);
  private readonly destroy$ = new Subject<void>(); // 4. El interruptor

  private titleService = inject(Title);
  private metaService = inject(Meta);


  blogs: BlogResponse[] = [];
  paginationData?: PaginationMetadata | null = null;
  currentCategory: string = '';
  currentPage: number = 1;
  isLoading: boolean = false;

  categories = [
    { id: '', label: 'All' },
    { id: 'tips', label: 'Tips' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'culture', label: 'Culture' },
    { id: 'history', label: 'History' },
    { id: 'excursions', label: 'Excursions' },
    { id: 'activities', label: 'Activities' },
  ];

  ngOnInit() {

    this.titleService.setTitle('Punta Cana Travel Blog & Tips | Discover Caribbean Adventures | ExpediNap');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explore the Punta Cana travel blog by ExpediNap. Discover expert tips, destination guides, culture, history, and the best excursions in the Dominican Republic. Plan your Caribbean adventure today.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'Punta Cana blog, Dominican Republic travel blog, travel tips Caribbean, Punta Cana guide, things to do Punta Cana, excursions blog, travel recommendations, Caribbean destinations, ExpediNap blog, travel advice'
    });

    // 🔥 Open Graph (para compartir en redes)
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Punta Cana Travel Blog & Tips | Discover Caribbean Adventures | ExpediNap'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Explore expert travel tips, destination guides, and the best excursions in Punta Cana. Plan your dream Caribbean vacation with ExpediNap.'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/dfwpolska/image/upload/v1776901038/social-blog.webp' // ⚠️ Cambiar por una imagen de blog
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.expedinap.com/blogs'
    });

    this.loadBlogs();
  }

  loadBlogs(page: number = 1, category?: string) {
    this.isLoading = true;

    this.blogService.getBlogs(
      page,
      12,
      undefined,
      category || this.currentCategory)
      .pipe(takeUntil(this.destroy$)) // 5. Aplicar takeUntil
      .subscribe({
        next: (res) => {
          this.blogs = res.data;
          this.paginationData = res.pagination;
          this.currentPage = page;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentCategory = value;
    this.loadBlogs(1, value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
