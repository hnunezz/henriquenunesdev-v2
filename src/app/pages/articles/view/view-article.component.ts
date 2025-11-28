import { Component, inject, Input, OnInit } from '@angular/core';
import { ArticlesService, IArticles } from '../../../core/services/articles.service';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';
import { Router } from '@angular/router';
import { SEOService } from '../../../core/services/seo.service';
import { SchemaService } from '../../../core/services/schema.service';

@Component({
  selector: 'app-view-article',
  imports: [SafeHtmlPipe],
  templateUrl: './view-article.component.html',
})
export class ViewArticleComponent implements OnInit {
  @Input() path: string = '';

  private router = inject(Router);
  private articlesService = inject(ArticlesService);
  private seoService = inject(SEOService);
  private schemaService = inject(SchemaService);

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
      if (!article) {
        this.router.navigate(["/articles"]);
        return;
      }

      this.article = article as IArticles;

      // Update SEO for article
      this.seoService.updateSEO({
        title: article.title,
        description: article.description || article.title,
        keywords: article.categories?.join(', ') || 'Artigo, Desenvolvimento Web',
        image: article.thumbnail || article.link,
        url: `/articles/view/${article.slug}`,
        type: 'article',
        author: article.author || 'Henrique Nunes',
        publishedTime: article.pubDate,
        modifiedTime: article.pubDate
      });

      // Add Article Schema
      this.schemaService.addArticleSchema({
        headline: article.title,
        description: article.description || article.title,
        image: article.thumbnail,
        datePublished: article.pubDate,
        dateModified: article.pubDate,
        author: {
          name: article.author || 'Henrique Nunes',
          url: 'https://henriquenunes.com'
        },
        publisher: {
          name: 'Henrique Nunes',
          logo: 'https://henriquenunes.com/assets/img/2BE6DDB9-305C-40EF-8DF8-9543316D09CB.JPG'
        }
      });
    });
  }


  goTo(url: string) {
    window.open(url, '_blank');
  }
}
