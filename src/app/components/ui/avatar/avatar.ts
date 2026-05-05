import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar implements OnChanges{
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() fallbackText: string = 'U'; // Por defecto una 'U' de Usuario
  @Input() customClass: string = '';

  hasError = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.hasError = false;
    }
  }

  handleError() {
    this.hasError = true;
  }
}
