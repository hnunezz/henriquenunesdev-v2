import { DestroyRef, inject, Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface IArticles {
  title: string;
  pubDate: string; // "2025-09-01 19:59:50"
  link: string;
  guid: string;
  author: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private http = inject(HttpClient);
  private all$?: Observable<{ status: string, feed: any, items: IArticles[] }>;

  get() {
    if (!this.all$) {
      this.all$ = this.http
        .get<{ status: string, feed: any, items: IArticles[] }>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nunesdealmeidahenrique")
        .pipe(
          map(res => ({
            ...res,
            items: res.items.map(item => ({
              ...item,
              slug: this.formatTitle(item.title)
            }))
          })),
          shareReplay(1)
        );
    }

    return this.all$;
  }

  getBySlug(slug: string): Observable<IArticles | undefined> {
    return this.get().pipe(map(list => list.items.find(a => {
      return a.slug === slug
    })));
  }

  private formatTitle(text: string): string {
    const beforeColon = text.split(':')[0];

    return beforeColon
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "-");
  }
}
