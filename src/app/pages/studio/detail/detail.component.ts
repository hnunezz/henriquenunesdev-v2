import { Component, computed, effect, HostListener, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../../core/directives/reveal.directive';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';
import { SEOService } from '../../../core/services/seo.service';
import { StudioService, IStudioProject } from '../../../core/services/studio.service';
import { ProjectsService } from '../../../core/services/projects.service';
import { mapProjectToStudio } from '../studio.component';

@Component({
  selector: 'app-studio-detail',
  imports: [RouterLink, TranslateModule, RevealDirective, SafeHtmlPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class StudioDetailComponent {
  // input() signal — reativo: computed() rastreia mudanças automaticamente
  slug = input<string>('');

  private studioService = inject(StudioService);
  private projectsService = inject(ProjectsService);
  private router = inject(Router);
  private seoService = inject(SEOService);
  private translate = inject(TranslateService);

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

  project = computed(() => {
    const found = this.allProjects().find(p => p.slug === this.slug());
    if (!found && this.allProjects().length > 0) {
      this.router.navigate(['/studio']);
    }
    return found ?? null;
  });

  currentIndex = computed(() =>
    this.allProjects().findIndex(p => p.slug === this.slug())
  );

  prevProject = computed(() =>
    this.allProjects()[this.currentIndex() - 1] ?? null
  );

  nextProject = computed(() =>
    this.allProjects()[this.currentIndex() + 1] ?? null
  );

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) {
        const desc = this.translate.instant(p.descriptionKey) || p.title;
        this.seoService.updateSEO({
          title: `${p.title} — Studio`,
          description: desc.replace(/<[^>]*>/g, '').substring(0, 160),
          keywords: `${p.title}, ${p.tags.join(', ')}, Freelance, Studio`,
          image: p.coverImage,
          url: `/studio/${p.slug}`,
          type: 'website',
        });
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    this.router.navigate(['/studio']);
  }

  goToSite(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener');
    }
  }
}
