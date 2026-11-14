import { Component } from '@angular/core';
import { certificates } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { formatDate, sortKey } from '../../utils/format';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="certificates" class="section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">04. certificates</p>
          <h2 class="section-title">Certificates</h2>
        </header>

        <ul class="list">
          @for (certificate of certificates; track certificate.title; let i = $index) {
            <li class="item" appReveal [revealDelay]="i * 80">
              <span class="medal"><app-icon name="award" [size]="20" /></span>
              <div class="body">
                <h3 class="title">{{ certificate.title }}</h3>
                <p class="meta">{{ certificate.issuer }} · {{ certificate.issued }}</p>
                @if (certificate.description) {
                  <p class="description">{{ certificate.description }}</p>
                }
                @if (certificate.url) {
                  <a class="text-link" [href]="certificate.url" target="_blank" rel="noopener">
                    View credential
                    <app-icon name="external" [size]="15" />
                  </a>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-top: 0;
    }

    .list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
    }

    .item {
      display: flex;
      gap: 1rem;
      padding: 1.25rem 1.3rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
    }

    .medal {
      display: grid;
      place-items: center;
      flex: none;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: var(--warn-soft);
      color: var(--warn);
    }

    .title {
      font-size: 1rem;
    }

    .meta {
      margin-top: 0.3rem;
      color: var(--text-faint);
      font-family: var(--font-mono);
      font-size: 0.76rem;
    }

    .description {
      margin-top: 0.6rem;
      color: var(--text-muted);
      font-size: 0.94rem;
    }

    .text-link {
      margin-top: 0.7rem;
    }

    @media (max-width: 760px) {
      .list {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class CertificatesComponent {
  /** Most recent first. */
  protected readonly certificates = [...certificates]
    .sort((a, b) => sortKey(b.date) - sortKey(a.date))
    .map((certificate) => ({ ...certificate, issued: formatDate(certificate.date) }));
}
