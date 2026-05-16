import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IStudioProject {
  slug: string;
  title: string;
  descriptionKey: string;
  url: string;
  year: string;
  category: string;
  coverImage: string;
  images: { url: string; alt: string }[];
  tags: string[];
  client?: string;
  technologies?: { icon: string; name: string; color: string }[];
  featured?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StudioService {
  private projects: IStudioProject[] = [
    {
      slug: 'wa-fitas',
      title: 'W.A Fitas',
      descriptionKey: 'PROJECTS-VIEW.BM-CLEANING-QUEENS.DESCRIPTION',
      url: 'https://wwww.wafitas.com/',
      year: '2026',
      category: 'Landing Page',
      coverImage: 'assets/img/projects/bmcleaning/bmq1.png',
      images: [
        {
          url: 'assets/img/projects/bmcleaning/bmq1.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq2.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq3.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq4.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq5.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq6.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq7.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
      ],
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      client: 'W.A Fitas LTDA',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'CSS', color: '#1572B6' },
      ],
    },
    {
      slug: 'bm-cleaning-queens',
      title: 'BM Cleaning Queens',
      descriptionKey: 'PROJECTS-VIEW.BM-CLEANING-QUEENS.DESCRIPTION',
      url: 'https://bmcleaningqueens.com/',
      year: '2026',
      category: 'Landing Page',
      coverImage: 'assets/img/projects/bmcleaning/bmq1.png',
      images: [
        {
          url: 'assets/img/projects/bmcleaning/bmq1.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq2.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq3.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq4.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq5.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq6.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
        {
          url: 'assets/img/projects/bmcleaning/bmq7.png',
          alt: 'BM Cleaning Queens - Tela principal',
        },
      ],
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      client: 'BM Cleaning Queens',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
      featured: true,
    },
    {
      slug: 'pokefrenzy',
      title: 'Pokefrenzy',
      descriptionKey: 'PROJECTS-VIEW.POKEFRENZY.DESCRIPTION',
      url: 'https://pokefrenzy.com/',
      year: '2026',
      category: 'Web Design',
      coverImage: 'assets/img/projects/pokefrenzy/depois1.png',
      images: [
        {
          url: 'assets/img/projects/pokefrenzy/depois1.png',
          alt: 'Pokefrenzy - Nova tela inicial',
        },
        {
          url: 'assets/img/projects/pokefrenzy/depois2.png',
          alt: 'Pokefrenzy - Nova interface',
        },
        {
          url: 'assets/img/projects/pokefrenzy/depois3.png',
          alt: 'Pokefrenzy - Novo design',
        },
        {
          url: 'assets/img/projects/pokefrenzy/depois4.png',
          alt: 'Pokefrenzy - Melhorias',
        },
        {
          url: 'assets/img/projects/pokefrenzy/depois5.png',
          alt: 'Pokefrenzy - Melhorias',
        },
      ],
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Gaming'],
      client: 'Pokefrenzy',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-js', name: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
    },
    {
      slug: 'ig-clean',
      title: 'IG Clean',
      descriptionKey: 'PROJECTS-VIEW.IG-CLEAN.DESCRIPTION',
      url: '#',
      year: '2025',
      category: 'Landing Page',
      coverImage: 'assets/img/projects/igclean/Depois1.png',
      images: [
        {
          url: 'assets/img/projects/igclean/Depois1.png',
          alt: 'IG Clean - Tela principal',
        },
        {
          url: 'assets/img/projects/igclean/Depois2.png',
          alt: 'IG Clean - Tela principal',
        },
        {
          url: 'assets/img/projects/igclean/Depois3.png',
          alt: 'IG Clean - Tela principal',
        },
        {
          url: 'assets/img/projects/igclean/Depois4.png',
          alt: 'IG Clean - Tela principal',
        },
      ],
      tags: ['Angular', 'Tailwind CSS', 'Institucional'],
      client: 'IG Clean',
      technologies: [
        { icon: 'fa-brands fa-angular', name: 'Angular', color: '#DD0031' },
        { icon: 'fa-brands fa-html5', name: 'HTML5', color: '#E34F26' },
        { icon: 'fa-brands fa-css3', name: 'Tailwind CSS', color: '#1572B6' },
      ],
      featured: false,
    },
  ];

  get(): Observable<IStudioProject[]> {
    return of(this.projects);
  }
}
