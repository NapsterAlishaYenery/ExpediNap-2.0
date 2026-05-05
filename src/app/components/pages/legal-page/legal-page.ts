import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegalContent } from '../../../core/interfaces/legal-content/legal-content.interface';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-legal-page',
  imports: [IconsModule],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.css',
})
export class LegalPage implements OnInit{
private route = inject(ActivatedRoute);
  content!: LegalContent;

  ngOnInit(): void {
    // Suscribirse a los datos de la ruta definidos en app.routes.ts
    this.route.data.subscribe(data => {
      this.content = data['content'];
    });
  }
}
