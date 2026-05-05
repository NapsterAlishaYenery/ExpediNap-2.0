import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../../ui/button/button';
import { WeatherService } from '../../../core/services/weather/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { WeatherBase } from '../../../core/interfaces/weather/weather.interface';

@Component({
  selector: 'app-top-bar',
  imports: [IconsModule, Button],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit, OnDestroy {

  private weatherService = inject(WeatherService);
  private readonly destroy$ = new Subject<void>();

  weatherDetails?: WeatherBase;
  isLoading = true;

  isScrollingDown = false;
  lastScrollTop = 0;

  // Escuchamos el scroll para ocultar/mostrar el TopBar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // Si bajamos más de 10px, ocultamos el TopBar
    if (st > this.lastScrollTop && st > 10) {
      this.isScrollingDown = true;
    } else {
      // Si subimos, lo mostramos
      this.isScrollingDown = false;
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  onWhatsApp() {
    const phone = '18098369303';
    const message = "Hello *ExpediNap!* I'm visiting your website and I'd like to receive information.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  ngOnInit(): void {
    this.loadingWeather();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadingWeather(): void {
    this.weatherService.getWeather('Punta Cana')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response.data)
          this.weatherDetails = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
  }
}
