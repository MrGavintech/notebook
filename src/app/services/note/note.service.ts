import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Note} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public notes = new Subject<Array<Note>>();

  constructor() {
  }

  menuNotes(notes: Array<any>) {
    this.notes.next(notes);
  }

  getMenuNotes(): Observable<any> {
    return this.notes.asObservable();
  }

}
