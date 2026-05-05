import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { Router } from '@angular/router';
import { BlogService } from '../../../../core/services/blogs/blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-manage-blogs',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './manage-blogs.html',
  styleUrl: './manage-blogs.css',
})
export class ManageBlogs implements OnInit, OnDestroy{
  private blogService = inject(BlogService);
  private router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  // Columnas recomendadas para Gestión de Contenido
  columns: TableColumn[] = [
    { key: 'title', label: 'Article Title' },
    { key: 'category', label: 'Category' }, // El GenericTable unirá el array
    { key: 'type', label: 'Format' },       // Guide, News, etc.
    { key: 'author', label: 'Author' },
    { key: 'createdAt', label: 'Published', type: 'date' }
  ];

  blogs: any[] = [];
  loading = false;

  categories = [
    { id: '', label: 'All Categories' },
    { id: 'tips', label: 'Tips' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'culture', label: 'Culture' },
    { id: 'history', label: 'History' },
    { id: 'excursions', label: 'Excursions' },
    { id: 'activities', label: 'Activities' },
  ];

  paginationConfig = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  };

  filters = {
    title: '',
    category: '',
    type: '',
    author: ''
  };

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs(page: number = 1) {
    this.loading = true;
    this.blogService.getBlogs(
      page,
      this.paginationConfig.limit,
      this.filters.title,
      this.filters.category,
      this.filters.type,
      this.filters.author
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        this.blogs = res.data;
        this.paginationConfig = {
          ...this.paginationConfig,
          currentPage: res.pagination.page,
          totalPages: res.pagination.totalPages,
          totalItems: res.pagination.totalItems,
          hasNextPage: res.pagination.hasNextPage,
          hasPrevPage: res.pagination.hasPrevPage
        };
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  applyFilters() {
    this.paginationConfig.currentPage = 1;
    this.loadBlogs();
  }

  resetFilters() {
    this.filters = { title: '', category: '', type: '', author: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadBlogs(newPage);
  }

  navigateToAdd() {
    this.router.navigate(['/admin/blogs/new']);
  }

  handleEdit(blog: any) {
    this.router.navigate(['/admin/blogs/edit', blog._id]);
  }

  handleDelete(blog: any) {
    if(confirm(`Delete article: "${blog.title}"?`)) {
       console.log('Deleting blog:', blog._id);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
