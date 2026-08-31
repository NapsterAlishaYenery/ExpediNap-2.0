import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-pagination',
  imports: [IconsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() hasNextPage: boolean = false;
  @Input() hasPrevPage: boolean = false;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
