import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../core/services/breadcrumb/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink, IconsModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
public breadcrumbService = inject(BreadcrumbService);
}
