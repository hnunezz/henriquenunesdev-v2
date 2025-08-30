import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ViewProjectComponent } from './view/view.component';


export const routes: Routes = [
  {
    path: "",
    component: ProjectsComponent,
  },
  {
    path: 'view/:path',
    component: ViewProjectComponent
  }
];
