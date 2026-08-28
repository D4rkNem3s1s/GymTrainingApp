import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'gym_app_theme';
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    let prefersDark = false;

    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const useDark = savedTheme !== null ? savedTheme === 'dark' : prefersDark;
    this.isDarkMode.set(useDark);
    this.applyTheme(useDark);
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode();
    this.isDarkMode.set(newMode);
    localStorage.setItem(this.STORAGE_KEY, newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }
}
