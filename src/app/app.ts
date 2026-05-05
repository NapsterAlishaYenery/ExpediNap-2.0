import { Component, DOCUMENT, inject, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Alert } from './components/ui/alert/alert';
import { CommonModule } from '@angular/common';
import { AlertService } from './core/services/alert/alert';
import { ThemeService } from './core/services/theme-service/theme.service';
import { WhatsappChat } from './components/home/whatsapp-chat/whatsapp-chat';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Alert,
    WhatsappChat
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ExpediNap-2.0';

  // Inyección de servicios globales
  public alertService = inject(AlertService);
  private renderer = inject(Renderer2);

  @Inject(DOCUMENT) private document = inject(DOCUMENT);

  private themeService = inject(ThemeService); // Inyectamos el servicio de tema
  private router = inject(Router); // Inyectamos el Router
  private activatedRoute = inject(ActivatedRoute)
  // Variables de estado global
  isDark = false;

  showWhatsapp = false; // Variable para el IF


  constructor() {
    // Escuchamos los cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateWhatsappVisibility(event.urlAfterRedirects);
    });

    // ¡ESTA ES LA CLAVE! 
    // Chequeamos inmediatamente al cargar por si la navegación ya pasó
    this.updateWhatsappVisibility(this.router.url);
  }

  /**
   * Manejo de Modo Oscuro
   */
  toggleDarkMode() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
  }


  // Función recursiva para buscar si el MainLayout está presente en la ruta actual
  private updateWhatsappVisibility(url: string) {
    // Definimos las rutas donde NO queremos el botón
    const forbiddenRoutes = ['/admin', '/login', '/register', '/password-recovery'];

    // Si la URL actual no empieza con ninguna de las prohibidas, mostramos el botón
    const isForbidden = forbiddenRoutes.some(route => url.startsWith(route));

    this.showWhatsapp = !isForbidden;
  }
}
