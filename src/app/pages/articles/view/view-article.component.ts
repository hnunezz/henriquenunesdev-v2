import { Component, inject, Input, OnInit } from '@angular/core';
import { ArticlesService, IArticles } from '../../../core/services/articles.service';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-article',
  imports: [SafeHtmlPipe],
  templateUrl: './view-article.component.html',
})
export class ViewArticleComponent implements OnInit {
  @Input() path: string = '';

  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  article: IArticles = {
    title: '',
    pubDate: '',
    link: '',
    guid: '',
    author: '',
    slug: '',
    thumbnail: '',
    description: '',
    content: '',
    categories: [],
  };

  ngOnInit(): void {
    this.articlesService.getBySlug(this.path).subscribe(article => {
      if (!article) this.router.navigate(["/articles"]);

      this.article = article as IArticles
    });
  }


  goTo(url: string) {
    window.open(url, '_blank');
  }
}
