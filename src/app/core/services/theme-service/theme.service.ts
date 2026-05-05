import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'expedinap-theme';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.applyStoredTheme();
  }

  // Cambia el tema y guarda en LocalStorage
  toggleTheme(): boolean {
    if (!this.isBrowser) return false;

    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    return isDark;
  }

  // Aplica el tema guardado al iniciar la app
  private applyStoredTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    // Si hay algo guardado, lo aplica. Si no, revisa la preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Para saber el estado actual
  isDarkMode(): boolean {
    if (!this.isBrowser) return false;
    return document.documentElement.classList.contains('dark');
  }

}
