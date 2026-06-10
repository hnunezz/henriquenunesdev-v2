import { Component, computed, effect, HostListener, inject, input, signal, PLATFORM_ID } from '@angular/core';
import { NgStyle, isPlatformBrowser } from '@angular/common';
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
  imports: [RouterLink, TranslateModule, RevealDirective, SafeHtmlPipe, NgStyle],
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
  private platformId = inject(PLATFORM_ID);

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
      this.slug();
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });

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

  lightboxSrc = signal<string | null>(null);
  lbScale = signal(1);
  lbTx = signal(0);
  lbTy = signal(0);

  lbImgStyle = computed(() => ({
    transform: `translate(${this.lbTx()}px, ${this.lbTy()}px) scale(${this.lbScale()})`,
    cursor: this.lbScale() > 1 ? 'grab' : 'default',
  }));

  private _pinchDist = 0;
  private _panX = 0;
  private _panY = 0;
  private _lastTap = 0;

  openLightbox(src: string) {
    this._resetTransform();
    this.lightboxSrc.set(src);
  }

  closeLightbox() {
    this.lightboxSrc.set(null);
    this._resetTransform();
  }

  private _resetTransform() {
    this.lbScale.set(1);
    this.lbTx.set(0);
    this.lbTy.set(0);
  }

  onLbTouchStart(e: TouchEvent) {
    e.stopPropagation();
    if (e.touches.length === 2) {
      this._pinchDist = this._touchDist(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
      this._panX = e.touches[0].clientX;
      this._panY = e.touches[0].clientY;
      const now = Date.now();
      if (now - this._lastTap < 280) {
        this.lbScale() > 1 ? this._resetTransform() : this.lbScale.set(2.5);
      }
      this._lastTap = now;
    }
  }

  onLbTouchMove(e: TouchEvent) {
    e.stopPropagation();
    if (e.touches.length === 2) {
      const d = this._touchDist(e.touches[0], e.touches[1]);
      const ratio = d / this._pinchDist;
      this.lbScale.update(s => Math.min(5, Math.max(1, s * ratio)));
      this._pinchDist = d;
    } else if (e.touches.length === 1 && this.lbScale() > 1) {
      const dx = e.touches[0].clientX - this._panX;
      const dy = e.touches[0].clientY - this._panY;
      this.lbTx.update(x => x + dx);
      this.lbTy.update(y => y + dy);
      this._panX = e.touches[0].clientX;
      this._panY = e.touches[0].clientY;
    }
  }

  private _touchDist(a: Touch, b: Touch) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.lightboxSrc()) {
      this.closeLightbox();
    } else {
      this.router.navigate(['/studio']);
    }
  }

  goToSite(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener');
    }
  }
}
