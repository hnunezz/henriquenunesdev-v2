import { Component, computed, effect, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';
import { ProjectsService } from '../../../core/services/projects.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { SEOService } from '../../../core/services/seo.service';
import { SchemaService } from '../../../core/services/schema.service';
import { RevealDirective } from '../../../core/directives/reveal.directive';

@Component({
  selector: 'app-view',
  imports: [SafeHtmlPipe, TranslateModule, DecimalPipe, RevealDirective],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewProjectComponent {
  @Input() path: string = '';

  router = inject(Router);
  private projectsService = inject(ProjectsService);
  private seoService = inject(SEOService);
  private schemaService = inject(SchemaService);
  private translate = inject(TranslateService);
  private projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });

  projectFiltered = computed(() => {
    const project = this.projectsSignal().filter(p => p.path === this.path)[0]
    if (!project) this.router.navigate(["/projects"]);
    return project;
  });

  constructor() {
    effect(() => {
      const project = this.projectFiltered();
      if (project) {
        const description = this.translate.instant(project.descriptionKey) || project.title;
        this.seoService.updateSEO({
          title: project.title,
          description: description.substring(0, 160),
          keywords: `${project.title}, Projeto, Desenvolvimento Web, Front-end`,
          image: project.logo || project.images[0]?.url,
          url: `/projects/view/${project.path}`,
          type: 'website'
        });

        // Add Project Schema
        this.schemaService.addProjectSchema({
          name: project.title,
          description: description,
          url: project.link,
          image: project.logo || project.images[0]?.url,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web'
        });
      }
    });
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
