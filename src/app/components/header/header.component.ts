import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PagesAnchor } from '../../app.component';
import { ThemeService } from '../../theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);

  router = inject(Router);
  navigation = PagesAnchor
}
