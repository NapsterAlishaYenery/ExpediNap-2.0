import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { IconsModule } from '../../../core/icons.module';
import { ImageUrlPipe } from "../../../core/pipes/image-url.pipe";
import { YachtResponse } from '../../../core/interfaces/yacht/yacht.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-yacht-card',
  imports: [CommonModule, Badge, Button, IconsModule, ImageUrlPipe, RouterLink],
  templateUrl: './yacht-card.html',
  styleUrl: './yacht-card.css',
})
export class YachtCard {
  @Input({ required: true }) yacht!: YachtResponse; 

}
