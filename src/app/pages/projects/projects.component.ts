import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ProjectsService } from '../../projects.service';

export interface IProject {
  year: string;
  title: string;
  description: string;
  path: string;
  link: string;
  images: [
    {
      url: string,
      alt: string,
    }
  ];
}
@Component({
  selector: 'app-projects',
  imports: [TimelineComponent],
  template: `
  <main class="px-10">
    <h1 class="page-header">
      My projects

      <span>I have worked on many projects over the years, from small applications to large systems.
        Some are private, but all were built with the same passion and dedication.
        These are the personal projects I am most proud of.</span>
    </h1>

    <app-timeline [projects]="projectsSignal()"/>
  </main>
  `,
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });
}
