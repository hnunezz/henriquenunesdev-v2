import { Component, inject, input, output } from '@angular/core';
import { IProject } from '../../pages/projects/projects.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  private router = inject(Router);
  projects = input<IProject[]>();

  seeMore(path: string) {
    this.router.navigate(['projects/view',  path]);
  }
}
