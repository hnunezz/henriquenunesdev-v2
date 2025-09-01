import { Injectable, signal } from '@angular/core';
import { IProject } from '../../pages/projects/projects.component';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: IProject[] = [
    {
      year: '2025',
      title: 'Hex6 BoardGame',
      description: `
        N/A
      `,
      path: 'hex-6-board-game',
      link: 'N/A',
      images: [],
    },
    {
      year: '2025',
      title: 'Whats my dream mean',
      description: `
        An interactive dream
        interpretation project was developed using the OpenAI API
        to provide intelligent responses based on traditional, cultural, and psychological meanings.<br/><br/>

        The application was built with <b>Angular v19 + NextJS</b>.<br/><br/>

        The user experience is the main focus: featuring a lightweight interface, a field to enter dreams, and instant analysis feedback.
      `,
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
      description: `
        Create your own LoL champion by combining iconic abilities! Combine the <b>P</b>, <b>Q</b>, <b>W</b>, <b>E</b>, and <b>R</b> commands with any skill in the game.<br/><br/>
        Get creative! Combine effects, synergies, and strategies to surprise your opponents.<br/><br/>
        Share your creation! Show off your custom champion on social media and challenge your friends!
      `,
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
