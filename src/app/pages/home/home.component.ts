import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../core/services/projects.service';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TimelineComponent, TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private projectsService = inject(ProjectsService);
  projectsSignal = toSignal(this.projectsService.get(), { initialValue: [] });

  works = [
    { title: 'Extreme Digital Solutions', path: 'assets/img/eds.jpeg', role: 'Front-end Dev. at PMERJ', date: '2024 - Present' },
    { title: 'Nava', path: 'assets/img/nava.jpeg', role: 'Mid-level Dev. at Santander', date: '2023 - 2024' },
    { title: 'Black101', path: 'assets/img/black101.jpeg', role: 'Mid-level Dev.', date: '2022 - 2023' },
    { title: 'Atlas Inovações', path: 'assets/img/atlas.jpeg', role: 'Jr Dev.', date: '2021 - 2022' },
  ]

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
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
}
