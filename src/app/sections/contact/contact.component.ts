import { Component } from '@angular/core';
import { profile } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="contact" class="section">
      <div class="container">
        <div class="panel" appReveal>
          <p class="eyebrow">05. contact</p>
          <h2 class="section-title">Get in touch</h2>
          <p class="lede">
            Have a role or a project in mind? Email is the quickest way to reach me.
          </p>

          <a class="btn btn-primary mail" [href]="'mailto:' + profile.email">
            <app-icon name="mail" [size]="17" />
            {{ profile.email }}
          </a>

          <ul class="links">
            <li>
              <a
                class="text-link"
                [href]="'https://github.com/' + profile.github"
                target="_blank"
                rel="noopener"
              >
                <app-icon name="github" [size]="16" />
                github.com/{{ profile.github }}
              </a>
            </li>
            <li>
              <a
                class="text-link"
                [href]="'https://www.linkedin.com/in/' + profile.linkedin"
                target="_blank"
                rel="noopener"
              >
                <app-icon name="linkedin" [size]="16" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} {{ profile.name }}</p>
        <p>
          Built with Angular ·
          <a
            class="source"
            [href]="'https://github.com/' + profile.github + '/resume-portfolio'"
            target="_blank"
            rel="noopener"
            >source</a
          >
        </p>
      </div>
    </footer>
  `,
  styles: `
    .panel {
      padding: clamp(1.75rem, 6vw, 3.5rem);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) + 6px);
      background:
        radial-gradient(34rem 16rem at 100% 0%, var(--glow), transparent 70%),
        var(--surface);
    }

    .mail {
      max-width: 100%;
      margin-top: 1.6rem;
      overflow-wrap: anywhere;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem 1.5rem;
      margin-top: 1.4rem;
    }

    .text-link {
      min-height: 32px;
    }

    .footer {
      border-top: 1px solid var(--border);
      color: var(--text-faint);
      font-family: var(--font-mono);
      font-size: 0.78rem;
    }

    .footer-inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.4rem 1.5rem;
      padding-block: 1.4rem;
    }

    .source {
      color: var(--text-muted);
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .source:hover {
      color: var(--accent);
    }
  `,
})
export class ContactComponent {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
