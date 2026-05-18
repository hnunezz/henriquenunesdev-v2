import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavItem, PagesAnchor } from '../../app.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
  template: `
    <footer
      class="border-t border-solid border-gray-secondary py-12 flex justify-center items-center flex-col text-center gap-6 max-md:py-10"
    >
      <span class="hns-logo text-2xl text-ft-primary mb-2">hn.</span>

      <nav class="flex gap-6 flex-wrap justify-center max-md:gap-4">
        @for (nav of navigation(); track $index) {
        <a
          class="text-sm font-medium cursor-pointer text-gray-primary transition-all duration-300 ease-in-out hover:text-primary-brand"
          [routerLink]="nav.anchor"
          >{{ nav.labelKey | translate }}</a
        >
        }
      </nav>

      <span class="text-xs text-gray-primary mt-2"
        >© {{ year }} Henrique Nunes ·
        {{ 'FOOTER.DESCRIPTION' | translate }}</span
      >
    </footer>
  `,
})
export class FooterComponent {
  router = inject(Router);
  navigation = input<NavItem[]>([]);

  year = new Date().getFullYear();
}
