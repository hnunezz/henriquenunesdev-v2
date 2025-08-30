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
    { title: 'Eu mesmo!', subtitle: 'Henrique', image: 'Henrique-2.jpeg' },
    { title: 'Zaira', subtitle: 'Zaira', image: 'zaira.jpg' },
    { title: 'Setup', subtitle: 'Setup', image: 'image.png' },
    { title: 'voando', subtitle: 'voando', image: 'voando.jpeg' },
    { title: 'Eu mesmoo!', subtitle: 'Henrique', image: 'Henrique-5.jpeg' },
    { title: 'Eu mesmoo!', subtitle: 'Henrique', image: 'Praia.jpeg' },
    { title: 'Setup-2', subtitle: 'MG_5824', image: 'IMG_5824.jpeg' },
    { title: 'Setup-2', subtitle: '6AF19D3-', image: 'Henrique-4.jpeg' },
    { title: 'Setup-2', subtitle: 'Setup-2', image: 'Setup-2.jpeg' },
  ];

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
