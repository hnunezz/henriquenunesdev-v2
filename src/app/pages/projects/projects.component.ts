import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ProjectsService } from '../../core/services/projects.service';
import { TranslateModule } from '@ngx-translate/core';

export interface ITestimonial {
  title: string;
  description: string;
  author?: string;
}

export interface ITechnology {
  icon: string; // Classe do ícone (ex: 'fa-brands fa-angular', 'fa-brands fa-react')
  name: string; // Nome da tecnologia
  color: string; // Cor para hover (ex: '#DD0031', '#61DAFB')
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
  logo?: string; // Logo para a view
  miniLogo?: string; // Mini logo para timeline
  status?: 'online' | 'offline'; // Status para SaaS
  usersCount?: number; // Número de usuários
  testimonials?: ITestimonial[]; // Relatos/referências reais
  technologies?: ITechnology[]; // Tecnologias utilizadas no projeto
  projectType?: 'client' | 'freelance' | 'personal'; // Tipo de projeto
  beforeAfterImages?: IBeforeAfterImages; // Imagens antes/depois para projetos de cliente/freelance
  conversionMetrics?: IConversionMetric[]; // Métricas de conversão para projetos de cliente/freelance
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
