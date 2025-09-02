import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ThemeService } from './core/services/theme.service';

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
    <div class="flex justify-center mx-5 h-full">
      <main class="flex flex-col justify-between border-x border-solid border-gray-secondary min-h-[100vh] w-[75rem]">
        <div class="flex flex-col justify-start">
          <app-header [navigation]="pagesAnchor" />
          <router-outlet />
        </div>
        &nbsp;
        <app-footer [navigation]="pagesAnchor"/>
      </main>
    </div>
    `,
})
export class AppComponent {
  themeService = inject(ThemeService)
  router = inject(Router)

  title = 'Henrique Nunes';
  pagesAnchor = PagesAnchor;

  constructor() {
    this.getTheme();
    this.listenRoutes();
  }

  private listenRoutes() {
    if (event instanceof NavigationStart) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  private getTheme() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('theme') === 'light') {
        this.themeService.toggleTheme();
      }
    }
  }
}
