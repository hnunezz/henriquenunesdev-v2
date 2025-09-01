import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SetupComponent } from './pages/setup/setup.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  { path: "home", component: HomeComponent },
  {
    path: "projects",
    loadChildren: () =>
      import('./pages/projects/projects.routes').then((c) => c.routes),
  },
  {
    path: "articles",
    loadChildren: () =>
      import('./pages/articles/articles.routes').then((c) => c.routes),
  },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "setup", component: SetupComponent },
  { path: '**', redirectTo: '/home' },
];
