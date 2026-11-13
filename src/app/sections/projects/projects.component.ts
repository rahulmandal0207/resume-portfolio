import { Component } from '@angular/core';
import { projects } from '../../data/portfolio.data';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { formatDate, formatRange } from '../../utils/format';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  /** Featured projects first, otherwise the order in the data file. */
  protected readonly projects = [...projects]
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .map((project) => ({
      ...project,
      period: project.end ? formatRange(project.start, project.end) : formatDate(project.start),
    }));
}
