import { Component, computed, inject, signal } from '@angular/core';
import { MenuService } from './menu.service';
import { NgClass } from '@angular/common';
import { PagesAnchor } from '../../app.component';

@Component({
  selector: 'app-menu',
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private menuService = inject(MenuService);

  navigation = PagesAnchor

  open: boolean = false;

  constructor() {
    this.menuService.state().subscribe(t => this.open = t);
  }

  onSelect(item: string) {
   this.menuService.setItems(item);
   this.close();
  }

  close() {
    this.menuService.close();
  }
}
