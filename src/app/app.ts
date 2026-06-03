import { Component, signal } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Layout } from '../app/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout, MatSlideToggle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
  }
}