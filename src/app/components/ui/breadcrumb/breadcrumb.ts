import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../core/services/breadcrumb/breadcrumb.service';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  imports: [AsyncPipe, RouterLink, IconsModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
public breadcrumbService = inject(BreadcrumbService);
}
