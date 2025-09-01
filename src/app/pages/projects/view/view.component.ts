import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';

@Component({
  selector: 'app-view',
  imports: [RouterLink,SafeHtmlPipe],
  templateUrl: './view.component.html',
})
export class ViewProjectComponent {
  @Input() path: string = '';

  router = inject(Router);
  private projectsService = inject(ProjectsService);
  private projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });

  projectFiltered = computed(() => {
    const project = this.projectsSignal().filter(p => p.path === this.path)[0]
    if (!project) this.router.navigate(["/projects"]);
    return project;
  });

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
