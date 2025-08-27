import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { SetupComponent } from './pages/setup/setup.component';
import { ArticlesComponent } from './pages/articles/articles.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {path: "home", component: HomeComponent},
  {path: "projects", component: ProjectsComponent},
  {path: "articles", component: ArticlesComponent},
  {path: "contact", component: ContactComponent},
  {path: "about", component: AboutComponent},
  {path: "setup", component: SetupComponent},
];
