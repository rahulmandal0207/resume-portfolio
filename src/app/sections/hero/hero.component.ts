import { Component } from '@angular/core';
import { profile } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';
import { TerminalComponent } from './terminal/terminal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, TerminalComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  protected readonly profile = profile;
}
