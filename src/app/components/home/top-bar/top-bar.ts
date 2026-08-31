import { Component, HostListener, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';
import { WeatherService } from '../../../core/services/weather/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { WeatherBase } from '../../../core/interfaces/weather/weather.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [IconsModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit, OnDestroy {

  private weatherService = inject(WeatherService);
  private readonly destroy$ = new Subject<void>();

  private platformId = inject(PLATFORM_ID);

  weatherDetails?: WeatherBase;
  isLoading = true;

  isScrollingDown = false;
  lastScrollTop = 0;

  // Escuchamos el scroll para ocultar/mostrar el TopBar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > this.lastScrollTop && st > 10) {
        this.isScrollingDown = true;
      } else {
        this.isScrollingDown = false;
      }

      this.lastScrollTop = st <= 0 ? 0 : st;
    }
  }

  onWhatsApp() {
    if (isPlatformBrowser(this.platformId)) {
      const phone = '18098369303';
      const message = "Hello *ExpediNap!* I'm visiting your website and I'd like to receive information.";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadingWeather();
    }
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
