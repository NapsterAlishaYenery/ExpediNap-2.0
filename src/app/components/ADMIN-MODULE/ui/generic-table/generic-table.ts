import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../../../core/icons.module';

@Component({
  selector: 'app-generic-table',
  imports: [CommonModule, IconsModule],
  templateUrl: './generic-table.html',
  styleUrl: './generic-table.css',
})
export class GenericTable {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  // Nuevos inputs para la numeración inteligente
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  getValue(item: any, key: string) {
    if (!key) return '';
    return key.split('.').reduce((obj, segment) => obj?.[segment], item);
  }

  // Método para calcular el número de fila global
  getGlobalIndex(localIndex: number): number {
    return (this.currentPage - 1) * this.limit + (localIndex + 1);
  }
}
