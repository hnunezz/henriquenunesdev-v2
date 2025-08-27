import { Component } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';

@Component({
  selector: 'app-projects',
  imports: [TimelineComponent],
  template: `
  <main class="px-10">
    <h1 class="page-header">
      My projects

      <span>Trabalhei em vários pequenos projetos ao longo dos anos, mas estes são os dos quais mais me orgulho. Alguns
        deles são de código aberto, então, se você vir algo que desperte seu interesse, confira o código e contribua se
        tiver ideias de como ele pode ser melhorado.</span>
    </h1>

    <app-timeline />
  </main>
  `,
})
export class ProjectsComponent {

}
