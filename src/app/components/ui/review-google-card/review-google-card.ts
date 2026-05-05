import { Component, Input } from '@angular/core';
import { GoogleReviewItem } from '../../../core/interfaces/review/google-review.interface';
import { IconsModule } from '../../../core/icons.module';
import { Avatar } from '../avatar/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-google-card',
  imports: [CommonModule, IconsModule, Avatar],
  templateUrl: './review-google-card.html',
  styleUrl: './review-google-card.css',
})
export class ReviewGoogleCard {

  @Input({ required: true }) review!: GoogleReviewItem;

  getInitials(name: string): string {
    if (!name) return 'G';
    return name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
