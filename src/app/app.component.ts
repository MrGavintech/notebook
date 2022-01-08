import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteService} from "./services/note/note.service";
import {SessionService} from "./services/session/session.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TooltipPosition} from "@angular/material/tooltip";

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
export class AppComponent implements OnInit, OnDestroy {
  static NOTE_HOME_TITLE: string = 'My notebook';
  static NOTE_SELECTED_ID: string = 'Note: '
  title: string = AppComponent.NOTE_HOME_TITLE;
  notes: Array<Note> = [];
  limit: number = 1;
  private subscriptions = new Subscription();
  positionOptions: TooltipPosition[] = ['right'];

  constructor(private noteService: NoteService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.notes = this.sessionService.getSession('notes');
    this.setTitle();
    this.updateMenu();
    this.initFirstNote();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateMenu() {
    this.subscriptions = this.noteService.getNotes()
      .subscribe(menuNotes => {
          this.notes = menuNotes;
        }
      )
  }

  private setTitle() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        if (this.router.url === '/') {
          this.title = AppComponent.NOTE_HOME_TITLE;
        } else {
          let id = this.router.url.replace('/note/', '')
          this.title = AppComponent.NOTE_SELECTED_ID + id;
        }
      }
    })
  }


  selectedNote(note: any): void {
    this.noteService.triggerSelectedNote(note);
  }

  initFirstNote() {
    if (this.notes.length < this.limit) {
      let id = new Date().getTime();
      let note: Note = <Note><unknown>({id: id, text: '', date: ''});
      this.notes.push(<Note>(note));
      this.sessionService.setSession('notes', this.notes);
      this.noteService.triggerNotes(this.notes);
      this.noteService.triggerSelectedNote(note);
      this.router.navigate(['/note', id]);
    }
  }
}
