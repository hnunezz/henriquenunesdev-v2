import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { StudioService, IStudioProject } from '../../core/services/studio.service';
import { ProjectsService } from '../../core/services/projects.service';
import { IProject } from '../projects/projects.component';

export function mapProjectToStudio(p: IProject): IStudioProject {
  return {
    slug: p.path,
    title: p.title,
    descriptionKey: p.descriptionKey,
    url: p.link,
    year: p.year,
    category: 'Personal',
    coverImage: p.images[0]?.url ?? '',
    images: p.images,
    tags: p.technologies?.map(t => t.name) ?? [],
    client: undefined,
    technologies: p.technologies,
    featured: false,
  };
}

@Component({
  selector: 'app-studio',
  imports: [RouterLink, TranslateModule, RevealDirective],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  private studioService = inject(StudioService);
  private projectsService = inject(ProjectsService);

  private allProjects$ = combineLatest([
    this.projectsService.get(),
    this.studioService.get(),
  ]).pipe(
    map(([portfolio, studio]) => [
      ...studio,
      ...portfolio.map(mapProjectToStudio),
    ])
  );

  allProjects = toSignal(this.allProjects$, { initialValue: [] as IStudioProject[] });
  activeFilter = signal('Todos');

  categories = computed(() => {
    const cats = [...new Set(this.allProjects().map(p => p.category))];
    return ['Todos', ...cats];
  });

  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Todos') return this.allProjects();
    return this.allProjects().filter(p => p.category === filter);
  });

  setFilter(cat: string) {
    this.activeFilter.set(cat);
  }

  visitSite(event: MouseEvent, url: string) {
    event.preventDefault();
    event.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener');
    }
  }
}
