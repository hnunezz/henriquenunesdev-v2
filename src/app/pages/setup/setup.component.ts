import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-setup',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  private readonly revealedSections = new Set<number>();
  private readonly revealDurationMs = 420;
  readonly setupBaseDelayMs = 80;
  readonly setupStaggerMs = 110;
  readonly visibleSectionCount = signal(1);

  setupData = [
    {
      id: 1,
      title: 'Workstation',
      items: [
        {
          title: 'MacBook Pro de 14”, M4 Pro, 24 GB de RAM (2024)',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_1.DESCRIPTION',
        },
        {
          title: `Montior AOC 24" 144Hz 1MS FreeSync`,
          descriptionKey: 'SETUP.WORKSTATION.ITEM_2.DESCRIPTION',
        },
        {
          title: 'Airpods Max',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_3.DESCRIPTION',
        },
        {
          title: 'Apple Magic keyboard',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_4.DESCRIPTION',
        },
        {
          title: 'Magic Trackpad',
          descriptionKey: 'SETUP.WORKSTATION.ITEM_5.DESCRIPTION',
        },
      ],
    },
    {
      id: 2,
      title: 'Development <br/> tools',
      items: [
        {
          title: 'VSCode',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_1.DESCRIPTION',
        },
        {
          title: 'Postman',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_2.DESCRIPTION',
        },
        {
          title: 'Figma',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_3.DESCRIPTION',
        },
        {
          title: 'AI Agents',
          descriptionKey: 'SETUP.DEV_TOOLS.ITEM_4.DESCRIPTION',
        },
      ],
    },
    {
      id: 3,
      title: 'Productivity',
      items: [
        {
          title: 'SETUP.NAME',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_1.DESCRIPTION',
        },
        {
          title: 'Notion',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_2.DESCRIPTION',
        },
        {
          title: 'Apple Focus',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_3.DESCRIPTION',
        },
        {
          title: 'Spotify',
          descriptionKey: 'SETUP.PRODUCTIVITY.ITEM_4.DESCRIPTION',
        },
      ],
    },
  ];

  isSectionVisible(sectionIndex: number): boolean {
    return sectionIndex < this.visibleSectionCount();
  }

  onSetupItemRevealed(
    sectionIndex: number,
    itemIndex: number,
    totalItems: number
  ): void {
    const isLastItem = itemIndex === totalItems - 1;
    if (!isLastItem) {
      return;
    }

    const revealSequenceCompletionDelay =
      this.setupBaseDelayMs +
      itemIndex * this.setupStaggerMs +
      this.revealDurationMs;

    this.unlockNextSection(sectionIndex, revealSequenceCompletionDelay);
  }

  private unlockNextSection(sectionIndex: number, delayMs: number): void {
    if (sectionIndex + 1 !== this.visibleSectionCount()) {
      return;
    }

    if (this.revealedSections.has(sectionIndex)) {
      return;
    }

    this.revealedSections.add(sectionIndex);

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        this.visibleSectionCount.update((value) =>
          Math.min(value + 1, this.setupData.length)
        );
      }, delayMs);
    }
  }
}
