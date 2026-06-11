import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';

  private readonly _theme = signal<ThemeMode>(this.getInitialTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    this.applyTheme(this._theme());
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this._theme() === 'dark' ? 'light' : 'dark';

    this._theme.set(nextTheme);
    localStorage.setItem(this.storageKey, nextTheme);
    this.applyTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this._theme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme(theme);
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return 'light';
  }

  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      return;
    }

    root.classList.remove('dark');
  }
}