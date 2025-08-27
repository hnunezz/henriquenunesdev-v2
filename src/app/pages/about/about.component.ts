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
    { title: 'Projeto A', subtitle: 'Angular + Nest', image: 'assets/img/hns1.jpeg' },
    { title: 'Projeto B', subtitle: 'UI/UX', image: 'assets/img/hns1.jpeg' },
    { title: 'Projeto C', subtitle: 'Data Viz', image: 'assets/img/hns1.jpeg' },
    { title: 'Projeto D', subtitle: 'Design System', image: 'assets/img/hns1.jpeg' },
  ];

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
