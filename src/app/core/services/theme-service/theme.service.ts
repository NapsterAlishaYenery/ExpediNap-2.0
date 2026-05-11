import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'expedinap-theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // 1. Estado reactivo global del tema
  darkMode = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
  }

  // Cambia el tema y actualiza el signal y localStorage
  toggleTheme(): void {
    if (!this.isBrowser) return;

    const newMode = !this.darkMode();
    this.darkMode.set(newMode);
    
    this.updateRender(newMode);
    localStorage.setItem(this.THEME_KEY, newMode ? 'dark' : 'light');
  }

  // Inicialización lógica
  private initializeTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    this.darkMode.set(isDark);
    this.updateRender(isDark);
  }

  // Manipulación del DOM centralizada
  private updateRender(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

}
