import { Component } from '@angular/core';
import { profile, timeline } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';
import { shortHash, sortKey } from '../../utils/format';

interface TerminalLine {
  kind: 'command' | 'output' | 'commit';
  text: string;
  hash?: string;
  head?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  protected readonly profile = profile;

  /** The terminal is generated from the data file, newest entries first. */
  protected readonly lines: TerminalLine[] = [
    { kind: 'command', text: 'whoami' },
    { kind: 'output', text: `${profile.name.toLowerCase()} · ${profile.role.toLowerCase()}` },
    { kind: 'command', text: 'cat stack.txt' },
    { kind: 'output', text: profile.headlineStack.join('  ·  ') },
    { kind: 'command', text: 'git log --oneline' },
    ...[...timeline]
      .sort((a, b) => sortKey(b.start) - sortKey(a.start))
      .slice(0, 4)
      .map<TerminalLine>((entry, index) => ({
        kind: 'commit',
        hash: shortHash(entry.id),
        text: `${entry.title} @ ${entry.org}`,
        head: index === 0,
      })),
  ];
}
