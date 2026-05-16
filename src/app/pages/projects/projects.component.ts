import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ProjectsService } from '../../core/services/projects.service';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { RouterLink } from '@angular/router';

export interface ITestimonial {
  title: string;
  description: string;
  author?: string;
}

export interface ITechnology {
  icon: string;
  name: string;
  color: string;
}

export interface IConversionMetric {
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export interface IBeforeAfterImages {
  before: { url: string, alt: string }[];
  after: { url: string, alt: string }[];
}

export interface IProject {
  year: string;
  title: string;
  descriptionKey: string;
  path: string;
  link: string;
  images: { url: string, alt: string }[];
  logo?: string;
  miniLogo?: string;
  status?: 'online' | 'offline';
  usersCount?: number;
  testimonials?: ITestimonial[];
  technologies?: ITechnology[];
  projectType?: 'client' | 'freelance' | 'personal';
  beforeAfterImages?: IBeforeAfterImages;
  conversionMetrics?: IConversionMetric[];
}

@Component({
  selector: 'app-projects',
  imports: [TimelineComponent, TranslateModule, RevealDirective, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });
}
