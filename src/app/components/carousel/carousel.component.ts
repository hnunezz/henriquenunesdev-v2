import {
  Component, ChangeDetectionStrategy, Input, ElementRef, NgZone, Signal,
  signal, computed, effect, OnInit, OnDestroy, PLATFORM_ID, inject
} from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';

export type CardItem = {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
};

@Component({
  standalone: true,
  selector: 'app-card-carousel',
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CardCarouselComponent implements OnInit, OnDestroy {
  @Input({ required: true }) set data(v: CardItem[]) { this.items.set(v ?? []); this.rebuild(); }

  @Input() perView = 3;

  items = signal<CardItem[]>([]);
  private clonesHead = 0;
  private clonesTail = 0;

  /** posição absoluta no array renderItems (inclui clones) */
  renderPos = signal(0);

  /** true enquanto ocorre o silent-jump após transição — desliga CSS transition */
  teleporting = signal(false);

  /** drag state como signals para que computed(transform) reaja */
  dragging = signal(false);
  private deltaX = signal(0);
  private startX = 0;

  private timer: any = null;
  @Input() autoplay = true;
  @Input() interval = 1000;

  /** índice lógico no array original (usado pelos dots) */
  activeIndex = computed(() => {
    const len = this.items().length;
    if (!len) return 0;
    return ((this.renderPos() - this.clonesHead) % len + len) % len;
  });

  /** array renderizado com clones (head + items + tail) */
  renderItems: Signal<CardItem[]> = computed(() => {
    const src = this.items();
    if (!src.length) return [];
    const head = src.slice(-this.clonesHead);
    const tail = src.slice(0, this.clonesTail);
    return [...head, ...src, ...tail];
  });

  private slideWidthPx(): number {
    if (!isPlatformBrowser(this.platformId)) return 1;
    const host = this.el.nativeElement as HTMLElement;
    const vw = host.querySelector('.viewport') as HTMLElement;
    if (!vw) return 1;
    const gap = parseFloat(getComputedStyle(host.querySelector('.track') as HTMLElement).gap || '0');
    const per = Number(getComputedStyle(host.querySelector('.carousel') as HTMLElement).getPropertyValue('--per-view')) || this.perView;
    return (vw.clientWidth - gap * (per - 1)) / per;
  }

  transform = computed(() => {
    const width = this.slideWidthPx();
    const x = -(this.renderPos() * (width + this.gapPx())) + (this.dragging() ? this.deltaX() : 0);
    return `translateX(${x}px)`;
  });

  private gapPx(): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const track = this.el.nativeElement.querySelector('.track') as HTMLElement | null;
    return track ? parseFloat(getComputedStyle(track).gap || '0') : 0;
  }

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.clearTimer();
      if (this.autoplay && this.items().length > 1 && isPlatformBrowser(this.platformId)) {
        this.ngZone.runOutsideAngular(() => {
          this.timer = setInterval(() => this.ngZone.run(() => this.next()), this.interval);
        });
      }
    });
  }

  ngOnInit(): void {
    this.clonesHead = this.perView;
    this.clonesTail = this.perView;
    // após setar clonesHead, posiciona no primeiro item real
    const len = this.items().length;
    if (len > 0) {
      this.renderPos.set(this.clonesHead);
    }
  }

  ngOnDestroy(): void { this.clearTimer(); }

  private rebuild() {
    const len = this.items().length;
    if (!len) { this.renderPos.set(this.clonesHead); return; }
    const logical = ((this.renderPos() - this.clonesHead) % len + len) % len;
    this.renderPos.set(this.clonesHead + logical);
  }

  next(): void { this.move(1); }
  prev(): void { this.move(-1); }

  goTo(index: number): void {
    this.renderPos.set(this.clonesHead + index);
  }

  private move(step: number) {
    if (!this.items().length) return;
    this.renderPos.update(p => p + step);
  }

  // LOOP INFINITO — silent-jump após animação terminar
  onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== 'transform') return;
    const len = this.items().length;
    if (!len) return;
    const pos = this.renderPos();
    const jump = (newPos: number) => {
      this.teleporting.set(true);
      this.renderPos.set(newPos);
      requestAnimationFrame(() => requestAnimationFrame(() => this.teleporting.set(false)));
    };
    if (pos >= this.clonesHead + len) jump(pos - len);
    else if (pos < this.clonesHead) jump(pos + len);
  }

  // DRAG
  onPointerDown(ev: PointerEvent) {
    (ev.target as Element).setPointerCapture?.(ev.pointerId);
    this.dragging.set(true);
    this.startX = ev.clientX;
    this.deltaX.set(0);
    this.clearTimer();
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.dragging()) return;
    this.deltaX.set(ev.clientX - this.startX);
  }

  onPointerUp() {
    if (!this.dragging()) return;
    const threshold = this.slideWidthPx() * 0.2;
    const dx = this.deltaX();
    this.dragging.set(false);
    this.deltaX.set(0);
    if (Math.abs(dx) > threshold) {
      dx < 0 ? this.next() : this.prev();
    }
    if (this.autoplay && this.items().length > 1) {
      this.timer = setInterval(() => this.next(), this.interval);
    }
  }

  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
  }

  private clearTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
}
