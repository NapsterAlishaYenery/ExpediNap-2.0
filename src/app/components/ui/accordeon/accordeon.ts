import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { itemCuestion } from '../../../core/interfaces/shared/shared.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordeon',
  imports: [CommonModule, IconsModule],
  templateUrl: './accordeon.html',
  styleUrl: './accordeon.css',
})
export class Accordeon {
 @Input() items: itemCuestion[] = [];
  @Input() allowMultiple = false;

  toggleItem(index: number) {
    if (!this.allowMultiple) {
      this.items.forEach((item, i) => {
        if (i !== index) item.isOpen = false;
      });
    }
    this.items[index].isOpen = !this.items[index].isOpen;
  }
}
