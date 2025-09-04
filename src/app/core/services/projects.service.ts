import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProject } from '../../pages/projects/projects.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: IProject[] = [
    {
      year: '2025',
      title: 'Hex6 BoardGame',
      descriptionKey: 'PROJECTS-VIEW.HEX6.DESCRIPTION',
      path: 'hex-6-board-game',
      link: 'https://hex6-boardgame.vercel.app/',
      images: [
        {
          url: 'assets/img/projects/HEX1.png',
          alt: 'HEX1',
        },
        {
          url: 'assets/img/projects/HEX2.png',
          alt: 'HEX2',
        },
        {
          url: 'assets/img/projects/HEX3.png',
          alt: 'HEX3',
        },
      ],
    },
    {
      year: '2025',
      title: 'Whats my dream mean',
      descriptionKey: 'PROJECTS-VIEW.WMDM.DESCRIPTION',
      path: 'whats-my-dream-mean',
      link: 'https://whats-my-dream-mean.vercel.app/',
      images: [
        {
          url: 'assets/img/projects/WMDM1.png',
          alt: 'WMDM1',
        },
        {
          url: 'assets/img/projects/WMDM3.png',
          alt: 'WMDM3',
        },
        {
          url: 'assets/img/projects/WMDM2.png',
          alt: 'WMDM2',
        },
      ],
    },
    {
      year: '2024',
      title: 'Ultimate Champion Creator',
      descriptionKey: 'PROJECTS-VIEW.UCC.DESCRIPTION',
      path: 'ultimate-champion-creator',
      link: 'https://ultimate-champion-creator.vercel.app/',
      images: [
        {
          url: 'assets/img/projects/UCC1.png',
          alt: 'UCC1',
        },
        {
          url: 'assets/img/projects/UCC2.png',
          alt: 'UCC2',
        },
        {
          url: 'assets/img/projects/UCC4.png',
          alt: 'UCC4',
        },
        {
          url: 'assets/img/projects/UCC3.png',
          alt: 'UCC3',
        },
      ],
    },
  ];

  get(): Observable<IProject[]> {
    return of(this.projects);
  }
}
