import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-generic',
  imports: [CommonModule],
  templateUrl: './hero-generic.html',
  styleUrl: './hero-generic.css',
})
export class HeroGeneric {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) bgImageUrl!: string;
  @Input() badgeText?: string;

}
