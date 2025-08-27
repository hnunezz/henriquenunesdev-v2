import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export interface FabMenuItem {
  anchor: string;
  label: string;
  // opcional: action?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private state$ = new Subject<boolean>();
  private item$ = new Subject<string>();

  // constructor() {
  //   this.state$ = new BehaviorSubject<boolean>();
  // }

  state() {
    return this.state$.asObservable();
  }

  anchor() {
    return this.item$.asObservable();
  }

  open() {
    this.state$.next(true);
  }
  close() {
    this.state$.next(false);
  }
  // private itemsState = new BehaviorSubject<FabMenuItem[]>([
  //   { id: 'item-1', label: 'Item 1' },
  //   { id: 'item-2', label: 'Item 2' },
  // ]);
  // items$ = this.itemsState.asObservable();

  // private selection = new Subject<FabMenuItem>();
  // selection$ = this.selection.asObservable();


  setItems(anchor: string) {
    this.item$.next(anchor);
  }

  // select(item: FabMenuItem) {
  //   this.selection.next(item);
  //   this.close();
  // }
}
