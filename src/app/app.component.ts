import {Component, OnInit} from '@angular/core';
import {NoteService} from "./services/note/note.service";
import {SessionService} from "./services/session/session.service";

export interface Note {
  id: number;
  text?: string;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My notebook';
  notes: Array<Note> = [];

  constructor(private noteService: NoteService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let sessionNotes = this.sessionService.getSession('notes');
    this.notes = sessionNotes;
    if (sessionNotes.length <= 0) {
      this.notes = sessionNotes;
      this.noteService.getMenuNotes()
        .subscribe(menuNotes => {
            this.notes = menuNotes;
          }
        )
    }
  }

  clickId(note: any) {
    console.log(note);
    // this.title = note;
  }
}
