import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public numNotesSubject = new Subject<Array<number>>();

  constructor() {
  }

  menuNotes(numNotes: Array<number>) {
    this.numNotesSubject.next(numNotes);
  }

  getMenuNotes(): Observable<any> {
    return this.numNotesSubject.asObservable();
  }

}
