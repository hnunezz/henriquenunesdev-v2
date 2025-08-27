import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  goTo(url: string) {
    window.open(url, '_blank');
  }
}
