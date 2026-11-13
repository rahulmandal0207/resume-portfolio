import { Component } from '@angular/core';
import { AboutComponent } from './sections/about/about.component';
import { CertificatesComponent } from './sections/certificates/certificates.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { TimelineComponent } from './sections/timeline/timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    TimelineComponent,
    ProjectsComponent,
    CertificatesComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
