import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { profile, projects, timeline } from './data/portfolio.data';
import { sortKey } from './utils/format';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let page: HTMLElement;

  const entries = () => page.querySelectorAll('app-timeline .entry');

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    page = fixture.nativeElement as HTMLElement;
  });

  it('shows the name as the only h1', () => {
    const headings = page.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain(profile.name);
  });

  it('renders every timeline entry from the data file', () => {
    expect(entries().length).toBe(timeline.length);
  });

  it('puts the most recent timeline entry first', () => {
    const newest = [...timeline].sort((a, b) => sortKey(b.start) - sortKey(a.start))[0];
    expect(entries()[0].querySelector('.title')?.textContent).toContain(newest.title);
  });

  it('filters the timeline by kind', () => {
    const experience = Array.from(
      page.querySelectorAll<HTMLButtonElement>('app-timeline .filters .filter'),
    ).find((button) => button.textContent?.includes('Experience'));

    experience?.click();
    fixture.detectChanges();

    expect(entries().length).toBe(timeline.filter((entry) => entry.kind === 'work').length);
    expect(page.querySelectorAll('app-timeline .entry.education').length).toBe(0);
  });

  it('renders a card for every project', () => {
    expect(page.querySelectorAll('app-projects .card').length).toBe(projects.length);
  });
});
