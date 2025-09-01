import { Routes } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { ViewArticleComponent } from './view/view-article.component';


export const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent,
  },
  {
    path: 'view/:path',
    component: ViewArticleComponent
  }
];
