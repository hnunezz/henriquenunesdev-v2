import { Component } from '@angular/core';
import { CardCarouselComponent, CardItem } from '../../components/carousel/carousel.component';
import { DropAreaComponent } from '../../components/drop-area/drop-area.component';

@Component({
  selector: 'app-about',
  imports: [DropAreaComponent, CardCarouselComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  cards: CardItem[] = [
    { title: 'Projeto B', subtitle: 'UI/UX', image: 'zaira.jpg' },
    { title: 'Projeto B', subtitle: 'UI/UX', image: 'zaira.jpg' },
    { title: 'Projeto B', subtitle: 'UI/UX', image: 'zaira.jpg' },
    { title: 'Projeto B', subtitle: 'UI/UX', image: 'zaira.jpg' },
  ];

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
