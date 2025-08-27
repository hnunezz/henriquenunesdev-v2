import { Component, ElementRef, ViewChild } from '@angular/core';

type PlacedItem = { id: number; label: string; color: string; x: number; y: number };

@Component({
  selector: 'app-drop-area',
  imports: [],
  templateUrl: './drop-area.component.html',
  styles: `
    .drop-area {
      transition: background 120ms ease, border-color 120ms ease;
    }

    .drop-area.drop-allowed {
      border-color: #7b3af2;
      background: #7a3af21f;
    }

    .placed {
      position: absolute;
      transform: translate(-50%, -50%);
      padding: 4px 8px;
      pointer-events: none;
    }
  `
})
export class DropAreaComponent {
  @ViewChild('dropArea', { static: true }) dropAreaRef!: ElementRef<HTMLElement>;

  palette = [
    { id: 1, label: 'angular', color: '#DD0031' },
    { id: 2, label: 'node-js', color: '#83CD29' },
    { id: 3, label: 'css3', color: '#214CE4' },
    { id: 4, label: 'html5', color: '#E54B20' },
    { id: 5, label: 'java', color: '#F70306' },
    { id: 6, label: 'js', color: '#F7E017' },
    { id: 8, label: 'apple', color: '#fff' },
    { id: 9, label: 'docker', color: '#0091E2' },
    { id: 10, label: 'react', color: '#60DBFB' },
    { id: 11, label: 'github', color: '#fff' },
    { id: 12, label: 'aws', color: '#FF9A01' },
  ];

  items: PlacedItem[] = [];
  hoverAllowed = false;

  onDragStart(ev: DragEvent, itemId: number) {
    ev.dataTransfer?.setData('text/plain', String(itemId));
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'copyMove';
    }
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    const { inside } = this.getLocalCoords(ev);
    this.hoverAllowed = inside;
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = inside ? 'copy' : 'none';
  }

  onDragLeave() {
    this.hoverAllowed = false;
  }

  onDrop(ev: DragEvent) {
    ev.preventDefault();

    const { x, y, rect, inside } = this.getLocalCoords(ev);
    this.hoverAllowed = false;
    if (!inside) return;

    const paletteItemId = Number(ev.dataTransfer?.getData('text/plain'));
    const index = this.palette.findIndex(p => p.id === paletteItemId);

    const paletteItem = this.palette[index];
    this.palette = this.palette.filter((_, i) => i !== index);

    const cx = Math.max(0, Math.min(Math.round(x), Math.round(rect.width)));
    const cy = Math.max(0, Math.min(Math.round(y), Math.round(rect.height)));

    this.items = [...this.items, { ...paletteItem, x: cx, y: cy }];
  }

  private getLocalCoords(ev: DragEvent) {
    const host = this.dropAreaRef.nativeElement;
    const rect = host.getBoundingClientRect();
    const clientX = ev.clientX ?? 0;
    const clientY = ev.clientY ?? 0;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    return { x, y, rect, inside };
  }
}
