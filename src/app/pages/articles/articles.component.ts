import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ArticlesService, IArticles } from '../../core/services/articles.service';
import { ShortDateIntlPipe } from '../../core/pipe/short-date.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-articles',
  imports: [ShortDateIntlPipe,TranslateModule],
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  articlesSignal = signal<IArticles[]>([]);

  ngOnInit() {
    this.getArticles();
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }

  read(article: IArticles) {
    this.router.navigate(['articles', 'view', article.slug]);
  }

  private getArticles() {
    this.articlesService
      .get()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.articlesSignal.set(res.items);
      });
  }



}
