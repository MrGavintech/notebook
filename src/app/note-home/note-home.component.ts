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

  constructor(private noteService: NoteService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.notes = this.sessionService.getSession('notes');
    this.noteService.menuNotes(this.notes);
  }

  addNote() {
    if (this.notes.length < 5) {
      let id = this.notes.length + 1;
      this.notes.push(<Note><unknown>({id: id, text: '', date: ''}))
      this.sessionService.setSession('notes', this.notes);
      this.noteService.menuNotes(this.notes);
    }
  }

  removeNote() {
    if (this.notes.length > 0) {
      // @ts-ignore
      let id = this.numNotes.pop();
      sessionStorage.setItem('notes', JSON.stringify(this.notes));
      sessionStorage.setItem('note' + id, JSON.stringify(<Note>({})))
      this.noteService.menuNotes(this.notes);
    }
  }

}
