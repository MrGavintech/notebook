import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Note} from "../../app.component";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public notes = new Subject<Array<Note>>();

  constructor(private sessionService: SessionService) {
  }

  menuNotes(notes: Array<any>) {
    this.notes.next(notes);
  }

  getMenuNotes(): Observable<any> {
    return this.notes.asObservable();
  }

  updateNote(textAreaData: string, note: Note, notes: Array<Note>): void {
    note.text = textAreaData;
    let newNotes: Array<Note> = [note]
    const updatedNotes = notes.map(originalNotes => {
      const newNote = newNotes.find(({id}) => id === originalNotes.id);
      return newNote ? newNote : originalNotes; // returns new note if we find it || original
    });
    this.sessionService.setSession('notes', updatedNotes);
  }

}
