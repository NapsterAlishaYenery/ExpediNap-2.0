import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users/users.service';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../core/interface/tables/TableColumn.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericTable } from '../../ui/generic-table/generic-table';
import { Pagination } from '../../../ui/pagination/pagination';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule, FormsModule, GenericTable, Pagination, IconsModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit, OnDestroy{

  private usersService = inject(UsersService);
  private readonly destroy$ = new Subject<void>();
  
  columns: TableColumn[] = [
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email Address' },
    { key: 'role', label: 'Role' },
    { key: 'active', label: 'Status' }, // Podríamos usar un pipe para mostrar Active/Inactive
    { key: 'createdAt', label: 'Joined', type: 'date' }
  ];

  users: any[] = [];
  loading = false;

  roles = [
    { id: '', label: 'All Roles' },
    { id: 'admin', label: 'Administrator' },
    { id: 'editor', label: 'Editor' },
    { id: 'user', label: 'Standard User' },
  ];

  paginationConfig = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 12
  };

  filters = {
    name: '',
    username: '',
    email: '',
    role: ''
  };

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.loading = true;
    this.usersService.getUsers(
      page,
      this.paginationConfig.limit,
      this.filters.name,
      this.filters.username,
      this.filters.email,
      this.filters.role
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        this.users = res.data;
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
    this.loadUsers();
  }

  resetFilters() {
    this.filters = { name: '', username: '', email: '', role: '' };
    this.applyFilters();
  }

  handlePageChange(newPage: number) {
    this.loadUsers(newPage);
  }

  handleEdit(user: any) {
    console.log('Edit user:', user._id);
  }

  handleDelete(user: any) {
    if(user.role === 'admin' && user.username === 'admin_expedinap') {
        alert("Safety Lock: The main administrator cannot be deleted.");
        return;
    }
    if(confirm(`Are you sure you want to delete user ${user.username}?`)) {
       console.log('Deleting user:', user._id);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
