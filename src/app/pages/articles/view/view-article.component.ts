import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArticlesService, IArticles } from '../../../core/services/articles.service';
import { SafeHtmlPipe } from '../../../core/pipe/safe-html.pipe';
import { Router, RouterLink } from '@angular/router';
import { SEOService } from '../../../core/services/seo.service';
import { SchemaService } from '../../../core/services/schema.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-view-article',
  imports: [SafeHtmlPipe, RouterLink, TranslateModule],
  templateUrl: './view-article.component.html',
})
export class ViewArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() path: string = '';

  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('bottomNavRef') bottomNavRef!: ElementRef;

  private router = inject(Router);
  private articlesService = inject(ArticlesService);
  private seoService = inject(SEOService);
  private schemaService = inject(SchemaService);

  readingProgress = signal(0);
  reachedEnd = signal(false);

  private observer!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      ([entry]) => this.reachedEnd.set(entry.isIntersecting),
      { threshold: 0.1 }
    );
    this.observer.observe(this.bottomNavRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const content = this.contentRef?.nativeElement;
    const nav = this.bottomNavRef?.nativeElement;
    if (!content || !nav) return;

    const contentTop = content.getBoundingClientRect().top + window.scrollY;
    const navTop = nav.getBoundingClientRect().top + window.scrollY;

    const start = contentTop;
    const end = navTop - window.innerHeight;

    if (end <= start) return;

    const progress = Math.min(100, Math.max(0,
      (window.scrollY - start) / (end - start) * 100
    ));
    this.readingProgress.set(progress);
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
