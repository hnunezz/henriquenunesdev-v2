import { Component } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';

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

    <app-timeline />
  </main>
  `,
})
export class ProjectsComponent {

}
