import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconsModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {

}
