import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnChanges, OnDestroy {
  private static observer: IntersectionObserver | null = null;
  private static callbacks = new WeakMap<Element, () => void>();
  private hasRevealed = false;
  private isObserved = false;

  @Input() revealDelay = 0;
  @Input() revealStagger = 0;
  @Input() revealCascade = false;
  @Input() revealEnabled = true;
  @Output() revealed = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    host.classList.add('reveal');

    if (this.revealDelay) {
      host.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    if (this.revealStagger > 0) {
      Array.from(host.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * this.revealStagger}ms`);
      });
    }

    if (this.revealCascade) {
      host
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => el.classList.add('reveal'));
    }

    if (!this.revealEnabled) {
      return;
    }

    RevealDirective.ensureObserver();
    if (!RevealDirective.observer) {
      this.reveal(host);
      return;
    }

    RevealDirective.callbacks.set(host, () => this.reveal(host));
    RevealDirective.observer.observe(host);
    this.isObserved = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['revealEnabled'] || !this.revealEnabled || this.hasRevealed || this.isObserved) {
      return;
    }

    const host = this.el.nativeElement;
    RevealDirective.ensureObserver();

    if (!RevealDirective.observer) {
      this.reveal(host);
      return;
    }

    RevealDirective.callbacks.set(host, () => this.reveal(host));
    RevealDirective.observer.observe(host);
    this.isObserved = true;
  }

  ngOnDestroy(): void {
    const host = this.el.nativeElement;
    if (RevealDirective.observer && this.isObserved) {
      RevealDirective.observer.unobserve(host);
    }
    RevealDirective.callbacks.delete(host);
  }

  private reveal(host: HTMLElement): void {
    if (this.hasRevealed) {
      return;
    }

    this.hasRevealed = true;
    host.classList.add('is-visible');
    if (this.revealStagger > 0) {
      Array.from(host.children).forEach((child) =>
        (child as HTMLElement).classList.add('is-visible')
      );
    }
    this.revealed.emit();
  }

  private static ensureObserver(): void {
    if (this.observer) return;
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cb = RevealDirective.callbacks.get(entry.target);
          if (cb) {
            cb();
            RevealDirective.observer!.unobserve(entry.target);
            RevealDirective.callbacks.delete(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
  }
}
