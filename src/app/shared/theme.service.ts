import { Injectable, afterNextRender, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

/**
 * Current colour theme. The initial value is set by the inline script in
 * index.html (before first paint); this service reads it and handles changes.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly current = signal<Theme>('dark');
  readonly theme = this.current.asReadonly();

  constructor() {
    afterNextRender(() => {
      const saved = document.documentElement.getAttribute('data-theme');
      this.current.set(saved === 'light' ? 'light' : 'dark');
    });
  }

  toggle(): Theme {
    return this.set(this.current() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): Theme {
    this.current.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can be blocked (private mode); the change still applies for this visit.
    }
    return theme;
  }
}
