import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavItem, PagesAnchor } from '../../app.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
  template: `
  <footer class="border-t-[1px] border-solid border-gray-secondary h-[200px] flex justify-center items-center flex-col text-center gap-[18px] max-md:h-[300px] max-md:justify-evenly">
    <div class="flex gap-8 max-md:grid max-md:grid-cols-6 max-md:grid-rows-2 max-md:auto-cols-fr">
      @for (nav of navigation(); track $index) {
        <a class="font-bold cursor-pointer text-ft-primary transition-all duration-300 ease-in-out hover:text-primary-brand col-span-2" [routerLink]="nav.anchor">{{nav.labelKey | translate}}</a>
     }
    </div>

    <span>© 2025 Henrique Nunes <br />
     {{"FOOTER.DESCRIPTION" | translate}}. </span>
  </footer>
  `,
})
export class FooterComponent {
  router = inject(Router);
  navigation = input<NavItem[]>([]);

}
