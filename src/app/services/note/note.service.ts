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

  /**
   * Triggers notes state event
   * @param notes
   */
  triggerNotes(notes: Array<any>) {
    this.notes.next(notes);
  }

  getNotes(): Observable<any> {
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

  removeNote(note: Note, notes: Array<Note>) {
    let removeIndex = notes.map(item => item.id).indexOf(note.id);
    notes.splice(removeIndex, 1);
    this.updateNote('', note, notes);
    this.triggerNotes(notes);
  }

  findNote(id: string | null | undefined): Note {
    let notes = this.sessionService.getSession('notes');
    let note = notes.find((note: { id: number; }) => {
      let parsedID = parseInt(<string>id)
      return note.id === parsedID;
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
