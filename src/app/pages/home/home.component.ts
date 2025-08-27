import { Component } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';

@Component({
  selector: 'app-home',
  imports: [TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  works = [
    { title: 'Extreme Digital Solutions', path:'assets/img/eds.jpeg', role: 'Front-end Senior at PMERJ', date: '2024 - Present' },
    { title: 'Nava', path:'assets/img/nava.jpeg', role: 'Mid-level Dev. at Santander', date: '2023 - 2024' },
    { title: 'Black101', path:'assets/img/black101.jpeg', role: 'Mid-level Dev.', date: '2022 - 2023' },
    { title: 'Atlas Inovações', path:'assets/img/atlas.jpeg', role: 'Front-end Jr Dev.', date: '2021 - 2022' },
  ]

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
