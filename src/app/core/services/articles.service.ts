import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IArticles } from '../../pages/articles/articles.component';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articles: IArticles[] = [
    {
      title: 'Portfólio de Desenvolvedor: Vender um produto ou mostrar quem você é?',
      path: 'portfolio-de-desenvolvedor',
      year: 'Set/2025',
      medium: 'https://medium.com/@nunesdealmeidahenrique/portf%C3%B3lio-de-desenvolvedor-vender-um-produto-ou-mostrar-quem-voc%C3%AA-%C3%A9-b80c511971be',
      linkedin: 'link',
      text: 'aa'
    }
  ];

  get(): Observable<IArticles[]> {
    return of(this.articles);
  }
}
