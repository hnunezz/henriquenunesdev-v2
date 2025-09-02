import { Component, computed, inject, input, signal } from '@angular/core';
import { MenuService } from './menu.service';
import { NgClass } from '@angular/common';
import { NavItem, PagesAnchor } from '../../app.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [NgClass, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private menuService = inject(MenuService);

  navigation = input<NavItem[]>([]);

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
