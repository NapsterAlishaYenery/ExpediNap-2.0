import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { BlogResponse } from '../../../core/interfaces/blog/blog.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule, IconsModule, Button, Badge,  RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard {
  @Input({ required: true }) blog!: BlogResponse;

}
