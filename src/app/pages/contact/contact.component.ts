import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  goTo(url: string) {
    window.open(url, '_blank');
  }
}
