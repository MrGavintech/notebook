import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Note} from "../../app.component";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public notes = new Subject<Array<Note>>();
  public currentNote = new Subject<Note>();

  constructor(private sessionService: SessionService) {
  }

  menuNotes(notes: Array<any>) {
    this.notes.next(notes);
  }

  getMenuNotes(): Observable<any> {
    return this.notes.asObservable();
  }

  updateNote(isDelete: boolean, textAreaData: string, note: Note, notes: Array<Note>): void {
    note.text = textAreaData;
    let newNotes: Array<Note> = [note]
    const updatedNotes = notes.map(originalNotes => {
      const newNote = newNotes.find(({id}) => id === originalNotes.id);
      return newNote ? newNote : originalNotes; // returns new note if we find it || original
    });
    console.log(updatedNotes);
    this.sessionService.setSession('notes', updatedNotes);
  }

  removeNote(note: Note, notes: Array<Note>) {
    let removeIndex = notes.map(item => item.id).indexOf(note.id);
    notes.splice(removeIndex, 1);
    this.updateNote(true, '', note, notes);
    this.menuNotes(notes);
  }

  findNote(id: string | null | undefined): Note {
    let notes = this.sessionService.getSession('notes');
    let note = notes.find((el) => {
      let parsedID = parseInt(<string>id)
      return el.id === parsedID;
    });
    return note;
  }

  triggerSelectedNote(note: Note): void {
    this.currentNote.next(note);
  }

  selectedNote(): Observable<Note> {
    return this.currentNote.asObservable();
  }

}
