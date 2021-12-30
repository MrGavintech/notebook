import {Component, OnInit} from '@angular/core';
import {NoteService} from "./services/note/note.service";
import {SessionService} from "./services/session/session.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  limit: number = 1;

  constructor(private noteService: NoteService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let sessionNotes = this.sessionService.getSession('notes');
    this.notes = sessionNotes;
    if (sessionNotes.length <= 0) {
      this.notes = sessionNotes;
      this.noteService.getMenuNotes()
        .subscribe(menuNotes => {
            console.log(menuNotes);
            this.notes = menuNotes;
            if (menuNotes.length === 0) {
              this.title = 'My notebook';
            }
          }
        )
    }
    this.setPageTitle(false);
    this.addNote();
  }

  setPageTitle(isHomeSelected: boolean): void {
    if (isHomeSelected) {
      this.title = 'My notebook'
    } else {
      this.noteService.selectedNote()
        .subscribe((note) => {
          this.title = note.id.toString();
        });
    }
  }

  selectedNote(note: any): void {
    this.noteService.triggerSelectedNote(note);
  }

  addNote() {
    if (this.notes.length < this.limit) {
      let id = new Date().getTime();
      let note: Note = <Note><unknown>({id: id, text: '', date: ''});
      this.notes.push(<Note>(note));
      this.sessionService.setSession('notes', this.notes);
      this.noteService.menuNotes(this.notes);
      this.noteService.triggerSelectedNote(note);
      this.router.navigate(['/note', id]);
    }
  }
}
