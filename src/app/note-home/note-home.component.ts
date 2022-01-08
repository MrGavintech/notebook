import {Component, OnInit} from '@angular/core';
import {NoteService} from "../services/note/note.service";
import {Note} from "../app.component";
import {SessionService} from "../services/session/session.service";

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {
  notes: Array<Note> = [];
  limit: number = 5;

  constructor(private noteService: NoteService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.notes = this.sessionService.getSession('notes');
    this.noteService.triggerNotes(this.notes);
  }

  addNote() {
    if (this.notes.length < this.limit) {
      let id = new Date().getTime();
      let note: Note = <Note><unknown>({id: id, text: '', date: ''});
      this.notes.push(note)
      this.sessionService.setSession('notes', this.notes);
      this.noteService.triggerNotes(this.notes);
    }
  }

  selectedNote(note: any) {
    this.noteService.triggerSelectedNote(note);
  }

  getTitleMessage(): string {
    const notesCount = this.notes.length;
    if (notesCount >= 2) {
      return 'You have ' + notesCount + ' notes.';
    } else if (notesCount === 1) {
      return 'You have ' + notesCount + ' note.'
    } else {
      return 'You don\'t have any notes. Press the add button to add up to ' + this.limit + ' notes.'
    }
  }
}
