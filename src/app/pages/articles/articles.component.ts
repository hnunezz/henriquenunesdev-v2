import { Component, inject } from '@angular/core';
import { ArticlesService } from '../../core/services/articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
export interface IArticles {
  year: string;
  title: string;
  path: string;
  medium: string;
  linkedin?: string;
  text: string;
}
@Component({
  selector: 'app-articles',
  imports: [],
  template: `
  <main class="px-10 max-md:px-1">
    <h1 class="page-header  max-md:px-4">
      Articles

      <span>some things I've been writing, follow me on <b>medium</b>!</span>

          <i class="w-fit text-[30px] fa-brands fa-medium cursor-pointer transition-all duration-300 ease-in-out hover:text-primary-brand"
        (click)="goTo('https://medium.com/@nunesdealmeidahenrique')"> </i>
    </h1>

    <hr class="h-[1px] border-gray-secondary text-[0px] mx-[10%] my-24">

    <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-8 max-md:flex max-md:flex-col">
      @for (article of articlesSignal(); track $index) {
        <div class="flex justify-center items-center">
          <div class="group flex flex-col justify-between p-4 min-h-52 w-[95%] border solid border-gray-secondary bg-transparent max-md:px-6 cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:border-primary-brand hover:bg-[#7a3af21f]">
            <h2 class="flex flex-col font-semibold text-2xl text-ft-primary gap-2">
              {{ article.title }}
              <small class="text-base font-medium text-gray-primary">{{article.year}}</small>
            </h2>
            <span class="text-lg text-end font-bold text-ft-primary group-hover:text-primary-brand" (click)="read(article.path)">read article -></span>
          </div>
        </div>
      }
    </div>
  </main>
  `,
})
export class ArticlesComponent {
  private router = inject(Router);
  private articlesService = inject(ArticlesService);
  articlesSignal = toSignal(this.articlesService.get(), { initialValue: [] });

  goTo(url: string) {
    window.open(url, '_blank');
  }

  read(path: string) {
    this.router.navigate(['articles/view', path]);
  }
}
