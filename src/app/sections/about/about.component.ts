import { Component } from '@angular/core';
import { profile, skills } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="about" class="section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">01. about</p>
          <h2 class="section-title">About</h2>
        </header>

        <div class="layout">
          <div class="bio" appReveal>
            @for (paragraph of profile.about; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <div class="skills">
            @for (group of skills; track group.label; let i = $index) {
              <div class="group" appReveal [revealDelay]="i * 70">
                <h3 class="group-label">{{ group.label }}</h3>
                <ul class="chips">
                  @for (item of group.items; track item) {
                    <li class="chip">{{ item }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(1.75rem, 5vw, 4rem);
      align-items: start;
    }

    .bio {
      display: grid;
      gap: 1rem;
      color: var(--text-muted);
      font-size: 1.05rem;
    }

    .skills {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.9rem;
    }

    .group {
      padding: 1rem 1.1rem 1.15rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
    }

    .group-label {
      margin-bottom: 0.7rem;
      color: var(--text);
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .group-label::before {
      content: '// ';
      color: var(--accent);
    }

    .chips .chip {
      white-space: normal;
    }

    @media (max-width: 860px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    @media (max-width: 460px) {
      .skills {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class AboutComponent {
  protected readonly profile = profile;
  protected readonly skills = skills;
}
