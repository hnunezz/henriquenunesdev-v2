import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProject } from '../../pages/projects/projects.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projects: IProject[] = [
    // {
    //   year: '2026',
    //   title: 'Pokefrenzy',
    //   path: 'pokefrenzy',
    //   link: 'https://pokefrenzy.com/',
    //   descriptionKey: 'PROJECTS-VIEW.POKEFRENZY.DESCRIPTION',
    //   projectType: 'client',
    //   technologies: [
    //     { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
    //     { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
    //     { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
    //     { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
    //   ],
    //   conversionMetrics:[
    //     {
    //       icon: 'fa-solid fa-memory',
    //       label: 'PROJECTS-VIEW.ANTES_E_DEPOIS.METRICA_OPTIONS.USO_MEMORIA',
    //       value: '-40%',
    //       description: 'PROJECTS-VIEW.ANTES_E_DEPOIS.METRICA_OPTIONS.USO_MEMORIA_DESCRIPTION',
    //     },
    //     {
    //       icon: 'fa-solid fa-code',
    //       label: 'PROJECTS-VIEW.ANTES_E_DEPOIS.METRICA_OPTIONS.TECNOLOGIAS',
    //       value: 'Next -> Angular',
    //       description: 'PROJECTS-VIEW.ANTES_E_DEPOIS.METRICA_OPTIONS.TECNOLOGIAS_DESCRIPTION',
    //     },
    //   ],
    //   beforeAfterImages: {
    //     before: [
    //       {
    //         url: 'assets/img/projects/pokefrenzy/antes1.png',
    //         alt: 'Antes - Tela inicial antiga',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/antes2.png',
    //         alt: 'Antes - Interface antiga',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/antes3.png',
    //         alt: 'Antes - Design antigo',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/antes4.png',
    //         alt: 'Antes - Design antigo',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/antes5.png',
    //         alt: 'Antes - Design antigo',
    //       },
    //     ],
    //     after: [
    //       {
    //         url: 'assets/img/projects/pokefrenzy/depois1.png',
    //         alt: 'Depois - Nova tela inicial',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/depois2.png',
    //         alt: 'Depois - Nova interface',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/depois3.png',
    //         alt: 'Depois - Novo design',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/depois4.png',
    //         alt: 'Depois - Melhorias implementadas',
    //       },
    //       {
    //         url: 'assets/img/projects/pokefrenzy/depois5.png',
    //         alt: 'Depois - Melhorias implementadas',
    //       },
    //     ],
    //   },
    //   images: [],
    // },
    {
      year: '2026',
      title: 'PLVNO',
      descriptionKey: 'PROJECTS-VIEW.PLVNO.DESCRIPTION',
      path: 'plvno',
      link: 'https://plvno.com',
      miniLogo: 'assets/img/projects/plvno/mini.png',
      status: 'online',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-node-js', name: 'Node.js', color: '#339933' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
      images: [
        {
          url: 'assets/img/projects/plvno/1.png',
          alt: '1',
        },
        {
          url: 'assets/img/projects/plvno/2.png',
          alt: '2',
        },
        {
          url: 'assets/img/projects/plvno/3.png',
          alt: '3',
        },
      ],
    },
    {
      year: '2025',
      title: 'Conecta Currículo',
      descriptionKey: 'PROJECTS-VIEW.CONECTA_CURRICULO.DESCRIPTION',
      path: 'conecta-curriculo',
      link: 'https://conecta-curriculo.com',
      miniLogo: 'assets/img/projects/conecta-curriculo/mini-logo.png', // Exemplo de mini logo
      status: 'offline',
      usersCount: 32,
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-node-js', name: 'Node.js', color: '#339933' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
      images: [
        {
          url: 'assets/img/projects/conecta-curriculo/CC1.png',
          alt: 'CC1',
        },
        {
          url: 'assets/img/projects/conecta-curriculo/CC2.png',
          alt: 'CC2',
        },
        {
          url: 'assets/img/projects/conecta-curriculo/CC3.png',
          alt: 'CC3',
        },
        {
          url: 'assets/img/projects/conecta-curriculo/CC4.png',
          alt: 'CC4',
        },
        {
          url: 'assets/img/projects/conecta-curriculo/CC5.png',
          alt: 'CC5',
        },
      ],
    },
    {
      year: '2024',
      title: 'Ultimate Champion Creator',
      descriptionKey: 'PROJECTS-VIEW.UCC.DESCRIPTION',
      path: 'ultimate-champion-creator',
      link: 'https://ultimate-champion-creator.vercel.app/',
      status: 'online',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
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
          url: 'assets/img/projects/UCC3.png',
          alt: 'UCC3',
        },
        {
          url: 'assets/img/projects/UCC4.png',
          alt: 'UCC4',
        },
        {
          url: 'assets/img/projects/UCC5.png',
          alt: 'UCC5',
        },
        {
          url: 'assets/img/projects/UCC6.png',
          alt: 'UCC6',
        },
        {
          url: 'assets/img/projects/UCC7.png',
          alt: 'UCC7',
        },
      ],
    },
  ];

  get(): Observable<IProject[]> {
    return of(this.projects);
  }
}
