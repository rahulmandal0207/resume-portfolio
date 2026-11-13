import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Fades an element in the first time it scrolls into view.
 *
 *   <div appReveal>…</div>
 *   <div appReveal [revealDelay]="120">…</div>
 *
 * The hidden state only applies when the page has JavaScript
 * (see `html.js .reveal` in styles.css), so prerendered HTML stays readable.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    class: 'reveal',
    '[style.transition-delay.ms]': 'revealDelay() || null',
  },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        element.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            element.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );

      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
