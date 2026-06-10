import {
  Component,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../core/services/projects.service';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SEOService } from '../../core/services/seo.service';
import { SchemaService } from '../../core/services/schema.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TimelineComponent, TranslateModule, RevealDirective, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  private seoService = inject(SEOService);
  private schemaService = inject(SchemaService);
  projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });
  scrollBadgeOpacity = 1;
  private readonly scrollFadeDistance = 220;

  works = [
    { title: 'Extreme Digital Solutions', path: 'assets/img/eds.webp', role: 'Front-end Dev. at PMERJ', date: '2024 - Present' },
    { title: 'Nava', path: 'assets/img/nava.webp', role: 'Mid-level Dev. at Santander', date: '2023 - 2024' },
    { title: 'Black101', path: 'assets/img/black101.webp', role: 'Mid-level Dev.', date: '2022 - 2023' },
    { title: 'Atlas Inovações', path: 'assets/img/atlas.webp', role: 'Jr Dev.', date: '2021 - 2022' },
  ]

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Início',
      description: 'Henrique Nunes - Software Engineer especializado em Front-end. Portfólio, projetos e experiência profissional em desenvolvimento web.',
      keywords: 'Henrique Nunes, Software Engineer, Front-end Developer, Angular, TypeScript, Portfólio',
      url: '/home'
    });

    // Add Person Schema
    this.schemaService.addPersonSchema({
      name: 'Henrique Nunes',
      jobTitle: 'Software Engineer',
      description: 'Software Engineer especializado em Front-end, trabalhando com Angular e tecnologias modernas.',
      url: 'https://henriquenunes.com',
      image: 'https://henriquenunes.com/assets/img/2BE6DDB9-305C-40EF-8DF8-9543316D09CB.JPG',
      sameAs: [
        'https://github.com/hnunezz',
        'https://www.linkedin.com/in/henrique-nunes-de-almeida-ba897a1aa/',
        'https://www.instagram.com/hnunes0/',
        'https://medium.com/@nunesdealmeidahenrique'
      ],
      address: {
        addressLocality: 'São Paulo',
        addressCountry: 'BR'
      }
    });

    // Add WebSite Schema
    this.schemaService.addWebSiteSchema({
      name: 'Henrique Nunes',
      url: 'https://henriquenunes.com',
      description: 'Portfólio de Henrique Nunes - Software Engineer especializado em Front-end'
    });

    this.updateScrollBadge();
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }


  downloadCV() {
    if (!isPlatformBrowser(this.platformId)) return;

    const lang = localStorage.getItem("lang");

    this.http.get(`assets/cv/henrique-nunes-cv-${lang}.pdf`, { responseType: 'blob' })
      .subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Henrique-Nunes-CV.pdf';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollBadge();
  }

  private updateScrollBadge(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const y = window.scrollY || 0;
    const opacity = Math.max(0, 1 - y / this.scrollFadeDistance);
    this.scrollBadgeOpacity = Number(opacity.toFixed(3));
  }
}
