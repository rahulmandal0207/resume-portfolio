import {
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { timeline } from '../../data/portfolio.data';
import { TimelineKind } from '../../data/portfolio.models';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { formatDuration, formatRange, shortHash, sortKey } from '../../utils/format';

type Filter = 'all' | TimelineKind;

const KIND_LABEL: Record<TimelineKind, string> = {
  work: 'Experience',
  education: 'Education',
};

/**
 * Work and education on one vertical timeline.
 *
 * As the page scrolls, a "reading line" sits at ~62% of the viewport height:
 *  - the rail fills down to that line,
 *  - entries fade in shortly before they reach it,
 *  - an entry's node lights up once it has crossed it.
 */
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  private readonly zone = inject(NgZone);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('trackEl');
  private readonly items = viewChildren<ElementRef<HTMLElement>>('item');

  private inBrowser = false;
  private frame = 0;

  protected readonly filter = signal<Filter>('all');
  protected readonly newestFirst = signal(true);

  protected readonly filters: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: timeline.length },
    { value: 'work', label: KIND_LABEL.work, count: this.count('work') },
    { value: 'education', label: KIND_LABEL.education, count: this.count('education') },
  ];

  /** Entries for the current filter and sort order, ready for the template. */
  protected readonly entries = computed(() => {
    const filter = this.filter();
    const direction = this.newestFirst() ? -1 : 1;

    return timeline
      .filter((entry) => filter === 'all' || entry.kind === filter)
      .sort((a, b) => direction * (sortKey(a.start) - sortKey(b.start)))
      .map((entry) => ({
        ...entry,
        kindLabel: KIND_LABEL[entry.kind],
        hash: shortHash(entry.id),
        range: formatRange(entry.start, entry.end),
        duration: formatDuration(entry.start, entry.end),
      }));
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.inBrowser = true;
      this.zone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.schedule, { passive: true });
        window.addEventListener('resize', this.schedule, { passive: true });
      });
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', this.schedule);
        window.removeEventListener('resize', this.schedule);
        cancelAnimationFrame(this.frame);
      });
      this.measure();
    });

    // Re-measure whenever the list is re-rendered (filter or sort changed).
    effect(() => {
      this.items();
      if (this.inBrowser) this.schedule();
    });
  }

  private count(kind: TimelineKind): number {
    return timeline.filter((entry) => entry.kind === kind).length;
  }

  /** At most one measurement per animation frame. */
  private readonly schedule = (): void => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measure());
  };

  private measure(): void {
    const track = this.track().nativeElement;
    const box = track.getBoundingClientRect();
    const readingLine = window.innerHeight * 0.62;
    const revealLine = window.innerHeight * 0.9;

    const progress = box.height
      ? Math.min(1, Math.max(0, (readingLine - box.top) / box.height))
      : 0;
    track.style.setProperty('--progress', progress.toFixed(4));

    for (const item of this.items()) {
      const element = item.nativeElement;
      const top = element.getBoundingClientRect().top;
      if (top < revealLine) element.classList.add('is-in');
      element.classList.toggle('is-passed', top + 26 < readingLine);
    }
  }
}
