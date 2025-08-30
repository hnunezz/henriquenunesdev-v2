import { Injectable, signal } from '@angular/core';
import { IProject } from './pages/projects/projects.component';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: IProject[] = [
    {
      year: '2025',
      title: 'Hex6 BoardGame',
      description: 'abc',
      path: 'hex-6-board-game',
      link: 'https://whats-my-dream-mean.vercel.app/',
      images: [
        {
          url: 'img/src/img',
          alt: 'alt',
        }
      ],
    },
    {
      year: '2025',
      title: 'Whats my dream mean',
      description: 'abc',
      path: 'whats-my-dream-mean',
      link: 'https://whats-my-dream-mean.vercel.app/',
      images: [
        {
          url: 'img/src/img',
          alt: 'alt',
        }
      ],
    },
    {
      year: '2024',
      title: 'Ultimate Champion Creator',
      description: 'abc',
      path: 'https://ultimate-champion-creator.vercel.app/',
      link: 'aaaaa',
      images: [
        {
          url: 'img/src/img',
          alt: 'alt',
        }
      ],
    },
  ];

  get(): Observable<IProject[]> {
    return of(this.projects);
  }

}
