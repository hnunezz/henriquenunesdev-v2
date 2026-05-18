import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavItem, PagesAnchor } from '../../app.component';
import { ThemeService } from '../../core/services/theme.service';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../menu/menu.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, FormsModule, TranslateModule, RevealDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  private menuService = inject(MenuService);
  themeService = inject(ThemeService);

  router = inject(Router);
  navigation = input<NavItem[]>([]);

  @ViewChild('navPill') navPill?: ElementRef<HTMLElement>;

  glider = signal<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  private lang = signal<'pt' | 'en'>('pt');
  private get isBrowser() {
    return typeof window !== 'undefined';
  }
  nextFlag = computed(() => (this.lang() === 'pt' ? '🇺🇸' : '🇧🇷'));

  constructor(private translate: TranslateService) {
    this.restoreLang();

    this.menuService.anchor().subscribe((anchor) => {
      this.router.navigate([anchor]);
    });

    this.translate.onLangChange.subscribe((e) => {
      const l = (e.lang === 'en' ? 'en' : 'pt') as 'pt' | 'en';
      this.lang.set(l);
      if (this.isBrowser) localStorage.setItem('lang', l);
      if (this.isBrowser) document.documentElement.setAttribute('lang', l);
      this.scheduleGliderUpdate();
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.scheduleGliderUpdate());
  }

  ngAfterViewInit() {
    this.scheduleGliderUpdate();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateGlider();
  }

  private scheduleGliderUpdate() {
    if (!this.isBrowser) return;
    requestAnimationFrame(() => this.updateGlider());
  }

  private updateGlider() {
    if (!this.isBrowser) return;
    const container = this.navPill?.nativeElement;
    if (!container) return;
    const active = container.querySelector<HTMLElement>('.nav-link.active');
    if (!active) {
      this.glider.update((g) => ({ ...g, visible: false }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    this.glider.set({
      left: aRect.left - cRect.left,
      width: aRect.width,
      visible: true,
    });
  }

  toggleLang() {
    const next = this.lang() === 'pt' ? 'en' : 'pt';
    this.translate.use(next); // dispara onLangChange, que persiste no storage
  }

  private restoreLang() {
    let initial: 'pt' | 'en' = 'pt';
    if (this.isBrowser) {
      const saved = localStorage.getItem('lang');
      if (saved === 'pt' || saved === 'en') {
        initial = saved;
      } else {
        const nav = navigator.language?.toLowerCase() ?? 'pt';
        initial = nav.startsWith('en') ? 'en' : 'pt';
      }
    }
    this.translate.setDefaultLang(initial);
    this.translate.use(initial);
    this.lang.set(initial);
    if (this.isBrowser) document.documentElement.setAttribute('lang', initial);
  }

  open() {
    this.menuService.open();
  }

  switch(lang: string) {
    this.translate.use(lang);
  }
}
