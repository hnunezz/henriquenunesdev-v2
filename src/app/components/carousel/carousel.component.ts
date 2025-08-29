import {
  Component, ChangeDetectionStrategy, Input, ElementRef, Signal,
  signal, computed, effect, OnInit, OnDestroy
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

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
  /** seus cards */
  @Input({ required: true }) set data(v: CardItem[]) { this.items.set(v ?? []); this.rebuild(); }

  /** quantos cards por view (base). Responsivo pode sobrescrever via CSS var(--per-view) */
  @Input() perView = 3;

  items = signal<CardItem[]>([]);
  private clonesHead = 0;
  private clonesTail = 0;

  /** índice lógico (no array original) */
  index = signal(0);

  /** estado de drag */
  dragging = false;
  private startX = 0;
  private deltaX = 0;

  /** timer de autoplay opcional (comente se não quiser) */
  private timer: any = null;
  @Input() autoplay = true;
  @Input() interval = 1000;

  /** array renderizado com clones (head + items + tail) */
  renderItems: Signal<CardItem[]> = computed(() => {
    const src = this.items();
    if (!src.length) return [];
    const head = src.slice(-this.clonesHead);
    const tail = src.slice(0, this.clonesTail);
    return [...head, ...src, ...tail];
  });

  /** largura de um slide em px (pega da viewport) */
  private slideWidthPx(): number {
    const host = this.el.nativeElement as HTMLElement;
    const vw = host.querySelector('.viewport') as HTMLElement;
    if (!vw) return 1;
    const gap = parseFloat(getComputedStyle(host.querySelector('.track') as HTMLElement).gap || '0');
    const per = Number(getComputedStyle(host.querySelector('.carousel') as HTMLElement).getPropertyValue('--per-view')) || this.perView;
    return (vw.clientWidth - gap * (per - 1)) / per;
  }

  /** transform com base no índice + drag */
  transform = computed(() => {
    const width = this.slideWidthPx();
    const baseIndex = this.index() + this.clonesHead; // desloca por causa dos clones de cabeça
    const x = -(baseIndex * (width + this.gapPx())) + (this.dragging ? this.deltaX : 0);
    return `translateX(${x}px)`;
  });

  private gapPx(): number {
    const track = this.el.nativeElement.querySelector('.track') as HTMLElement | null;
    return track ? parseFloat(getComputedStyle(track).gap || '0') : 0;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      // rearmar autoplay quando mudar interval/autoplay
      this.clearTimer();
      if (this.autoplay && this.items().length > 1) {
        this.timer = setInterval(() => this.next(), this.interval);
      }
    });
  }

  ngOnInit(): void {
    // clones básicos = perView para loop suave
    this.clonesHead = this.perView;
    this.clonesTail = this.perView;
  }
  ngOnDestroy(): void { this.clearTimer(); }

  private rebuild() {
    // garante que index esteja dentro do intervalo
    const len = this.items().length;
    if (len === 0) { this.index.set(0); return; }
    this.index.set((this.index() % len + len) % len);
  }

  // CONTROLES
  next(): void { this.move(1); }
  prev(): void { this.move(-1); }
  private move(step: number) {
    const len = this.items().length;
    if (!len) return;
    this.index.set((this.index() + step + len) % len);
  }

  // DRAG
  onPointerDown(ev: PointerEvent) {
    (ev.target as Element).setPointerCapture?.(ev.pointerId);
    this.dragging = true;
    this.startX = ev.clientX;
    this.deltaX = 0;
    this.clearTimer();
  }
  onPointerMove(ev: PointerEvent) {
    if (!this.dragging) return;
    this.deltaX = ev.clientX - this.startX;
  }
  onPointerUp() {
    if (!this.dragging) return;
    const threshold = this.slideWidthPx() * 0.2; // 20% do card
    const dx = this.deltaX;
    this.dragging = false;
    this.deltaX = 0;

    if (Math.abs(dx) > threshold) {
      dx < 0 ? this.next() : this.prev();
    }
    // reativa autoplay
    if (this.autoplay && this.items().length > 1) {
      this.timer = setInterval(() => this.next(), this.interval);
    }
  }

  // KEYBOARD (opcional)
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
  }

  // LOOP INFINITO (ajuste visual após animação)
  onTransitionEnd() {
    // como o índice é sempre modulo do array, não precisamos teletransportar.
    // Mantemos esse hook caso queira efeitos extras no futuro.
  }

  private clearTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
}
