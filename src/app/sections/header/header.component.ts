import {
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { profile } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly zone = inject(NgZone);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly profile = profile;
  protected readonly links = [
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly theme = signal<Theme>('dark');
  protected readonly menuOpen = signal(false);
  /** Id of the section currently in view, for the nav highlight. */
  protected readonly active = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const root = document.documentElement;
      this.theme.set(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

      // On scroll: solid background after a few pixels, and highlight the
      // last section whose top has passed 40% of the viewport height.
      let frame = 0;
      const update = () => {
        this.host.classList.toggle('scrolled', window.scrollY > 8);

        const line = window.innerHeight * 0.4;
        let current = '';
        for (const link of this.links) {
          const section = document.getElementById(link.id);
          if (section && section.getBoundingClientRect().top <= line) current = link.id;
        }
        if (current !== this.active()) this.zone.run(() => this.active.set(current));
      };
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      };

      this.zone.runOutsideAngular(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      });
      update();
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        cancelAnimationFrame(frame);
      });
    });
  }

  protected toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  }
}
