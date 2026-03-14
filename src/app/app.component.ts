import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ThemeService } from './core/services/theme.service';
import { SEOService } from './core/services/seo.service';
import { filter } from 'rxjs/operators';

export type NavItem = {
  labelKey: string;
  active: boolean;
  anchor: string;
};

export const PagesAnchor: NavItem[] = [
  { labelKey: 'NAV.HOME', active: true, anchor: '/home' },
  { labelKey: 'NAV.PROJECTS', active: false, anchor: '/projects' },
  { labelKey: 'NAV.ARTICLES', active: false, anchor: '/articles' },
  { labelKey: 'NAV.CONTACT', active: false, anchor: '/contact' },
  { labelKey: 'NAV.ABOUT', active: false, anchor: '/about' },
  { labelKey: 'NAV.SETUP', active: false, anchor: '/setup' },
];

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TranslateModule
  ],
  template: `
    <app-menu [navigation]="pagesAnchor"/>
    <div class="flex justify-center mx-5 h-full max-md:mx-2">
      <main class="flex flex-col justify-between border-x border-solid border-gray-secondary min-h-[100vh] w-[75rem]">
        <div class="flex flex-col justify-start">
          <app-header [navigation]="pagesAnchor" />
          <router-outlet />
        </div>
        <app-footer [navigation]="pagesAnchor"/>
      </main>
    </div>
    `,
})
export class AppComponent {
  themeService = inject(ThemeService)
  router = inject(Router)
  seoService = inject(SEOService)

  title = 'Henrique Nunes';
  pagesAnchor = PagesAnchor;

  constructor() {
    this.getTheme();
    this.listenRoutes();
    this.setupSEO();
  }

  private listenRoutes() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  private setupSEO() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.updateSEOForRoute(url);
    });
  }

  private updateSEOForRoute(url: string): void {
    const routeMap: { [key: string]: any } = {
      '/home': {
        title: 'Início',
        description: 'Henrique Nunes - Software Engineer especializado em Front-end. Portfólio, projetos e experiência profissional.',
        keywords: 'Henrique Nunes, Software Engineer, Front-end Developer, Portfólio'
      },
      '/about': {
        title: 'Sobre',
        description: 'Conheça mais sobre Henrique Nunes, Software Engineer especializado em desenvolvimento Front-end com Angular e tecnologias modernas.',
        keywords: 'Sobre Henrique Nunes, Desenvolvedor Front-end, Angular Developer'
      },
      '/projects': {
        title: 'Projetos',
        description: 'Explore os projetos desenvolvidos por Henrique Nunes. Aplicações web modernas, SaaS e projetos open source.',
        keywords: 'Projetos, Portfólio, Aplicações Web, SaaS, Desenvolvimento Web'
      },
      '/articles': {
        title: 'Artigos',
        description: 'Artigos e posts sobre desenvolvimento web, Angular, TypeScript e tecnologias front-end escritos por Henrique Nunes.',
        keywords: 'Artigos, Blog, Desenvolvimento Web, Angular, TypeScript, Front-end'
      },
      '/contact': {
        title: 'Contato',
        description: 'Entre em contato com Henrique Nunes. Propostas de trabalho, colaborações ou apenas trocar ideias sobre tecnologia.',
        keywords: 'Contato, Henrique Nunes, Trabalho, Colaboração'
      },
      '/setup': {
        title: 'Setup',
        description: 'Conheça o setup de trabalho de Henrique Nunes: hardware, software e ferramentas de desenvolvimento.',
        keywords: 'Setup, Hardware, Software, Ferramentas de Desenvolvimento'
      }
    };

    const seoData = routeMap[url] || routeMap['/home'];
    this.seoService.updateSEO({
      ...seoData,
      url: url
    });
  }

  private getTheme() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('theme') === 'light') {
        this.themeService.toggleTheme();
      }
    }
  }
}
