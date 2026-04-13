import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  goTo(url: string) {
    window.open(url, '_blank');
  }
}
