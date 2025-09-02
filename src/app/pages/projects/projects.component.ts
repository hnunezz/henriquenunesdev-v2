import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ProjectsService } from '../../core/services/projects.service';
import { TranslateModule } from '@ngx-translate/core';

export interface IProject {
  year: string;
  title: string;
  descriptionKey: string;
  path: string;
  link: string;
  images: { url: string, alt: string }[];
}
@Component({
  selector: 'app-projects',
  imports: [TimelineComponent,TranslateModule],
  template: `
  <main class="px-10">
    <h1 class="page-header">
      {{"PROJECTS.TITLE" | translate}}

      <span>{{"PROJECTS.DESCRIPTION" | translate}}</span>
    </h1>

    <app-timeline [projects]="projectsSignal()"/>
  </main>
  `,
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });
}
