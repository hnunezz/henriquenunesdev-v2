import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './theme.service';

export const PagesAnchor = [
  { label: "Home", active: true, anchor: "/home" },
  { label: "Projects", active: false, anchor: "/projects" },
  { label: "Contact", active: false, anchor: "/contact" },
  { label: "About", active: false, anchor: "/about" },
  { label: "Setup", active: false, anchor: "/setup" },
];
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
  <div class="flex justify-center mx-5 h-full">
    <main class="flex flex-col justify-between border-x border-solid border-gray-secondary min-h-[100vh] w-[75rem]">
      <div class="flex flex-col justify-start">
        <app-header />
        <router-outlet />
      </div>
      &nbsp;
      <app-footer />
    </main>
  </div>
  `,
})
export class AppComponent {
  themeService = inject(ThemeService)
  router = inject(Router)
  title = 'Henrique Nunes';

  constructor() {
    this.listenRoutes();
    this.getTheme();
  }

  private listenRoutes() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
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
