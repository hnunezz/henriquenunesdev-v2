import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.component.html',
})
export class ArticlesComponent {
  goTo(url: string) {
    window.open(url, '_blank');
  }
}
