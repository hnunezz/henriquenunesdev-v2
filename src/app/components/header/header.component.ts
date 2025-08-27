import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PagesAnchor } from '../../app.component';
import { ThemeService } from '../../theme.service';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private menuService = inject(MenuService);

  themeService = inject(ThemeService);

  router = inject(Router);
  navigation = PagesAnchor

  constructor() {
    this.menuService.anchor().subscribe(anchor => {
      this.router.navigate([anchor]);
    });
  }

  open() {
    this.menuService.open();
  }

}
