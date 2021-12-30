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
    this.noteService.menuNotes(this.notes);
  }

  addNote() {
    if (this.notes.length < this.limit) {
      let id = new Date().getTime();
      this.notes.push(<Note><unknown>({id: id, text: '', date: ''}))
      this.sessionService.setSession('notes', this.notes);
      this.noteService.menuNotes(this.notes);
    }
  }

  selectedNote(note: any) {
    this.noteService.triggerSelectedNote(note);
  }
}
