import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Note} from "../../note/note.component";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public numNotesSubject = new Subject<Array<number>>();
  public notes = new Subject<Array<Note>>();

  constructor() {
  }

  menuNotes(notes: Array<any>) {
    this.numNotesSubject.next(notes);
    this.notes.next(notes);
  }

  getMenuNotes(): Observable<any> {
    return this.numNotesSubject.asObservable();
  }

}
