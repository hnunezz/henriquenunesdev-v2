import { Routes } from '@angular/router';
import { StudioComponent } from './studio.component';
import { StudioDetailComponent } from './detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: StudioComponent,
  },
  {
    path: ':slug',
    component: StudioDetailComponent,
  },
];
