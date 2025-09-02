import { Component } from '@angular/core';
import { CardCarouselComponent, CardItem } from '../../components/carousel/carousel.component';
import { DropAreaComponent } from '../../components/drop-area/drop-area.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [DropAreaComponent, CardCarouselComponent, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  cards: CardItem[] = [
    { title: 'Eu mesmo!', subtitle: 'Henrique', image: 'Henrique-2.jpeg' },
    { title: 'Zaira', subtitle: 'Zaira', image: 'zaira.jpg' },
    { title: 'Setup', subtitle: 'Setup', image: 'image.png' },
    { title: 'voando', subtitle: 'voando', image: 'voando.jpeg' },
    { title: 'Eu mesmoo!', subtitle: 'Henrique', image: 'hns1.jpeg' },
    { title: 'Eu mesmoo!', subtitle: 'Henrique', image: 'Praia.jpeg' },
    { title: 'Setup-2', subtitle: 'MG_5824', image: 'IMG_5824.jpeg' },
    // { title: 'Setup-2', subtitle: '6AF19D3-', image: 'Henrique-4.jpeg' },
    { title: 'Setup-2', subtitle: 'Setup-2', image: 'Setup-2.jpeg' },
  ];

  goTo(url: string) {
    window.open(url, '_blank');
  }
}

// Sou Henrique Nunes, tenho 23 anos e programo desde 2018. Transformei meu hobby em profissão em 2021, quando iniciei minha carreira na área de tecnologia. Desde então, atuo principalmente com Desenvolvimento Front-End, com especialização no framework Angular, que se tornou minha principal ferramenta de trabalho.

// Desenvolver antes de ser uma profissão, sempre foi um hobby, gosto de desenvolver soluções, estudar e consumir bastante conteúdo da bolha dev!.

// Fora do VSCode curto muito tatuagem e sou apaixonado futebol (Corinthiano roxo!) Não perco a chance de sofrer pelo timão. Aprecio uma boa cerveja ouvindo um bom RAP, ouço tudo que desperta uma boa energia, TOCA RAUL!
// Coleciono adesivos e uns discos maneiro, sempre antenado também em moda e streetwear num geral, viva o hip-hop.
