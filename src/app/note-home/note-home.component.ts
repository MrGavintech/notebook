import {Component, OnInit} from '@angular/core';
import {Note} from "../note/note.component";
import {NoteService} from "../services/note/note.service";

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {
  numNotes = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.numNotes = sessionStorage.getItem('notes') === null ? [] : JSON.parse(sessionStorage.getItem('notes'));
    this.noteService.menuNotes(this.numNotes);
  }

  addNote() {
    if (this.numNotes.length < 5) {
      // @ts-ignore
      this.numNotes.push(this.numNotes.length + 1);
      sessionStorage.setItem('notes', JSON.stringify(this.numNotes));
      this.noteService.menuNotes(this.numNotes);
    }
  }

  removeNote() {
    if (this.numNotes.length > 0) {
      // @ts-ignore
      let id = this.numNotes.pop();
      sessionStorage.setItem('notes', JSON.stringify(this.numNotes));
      sessionStorage.setItem('note' + id, JSON.stringify(<Note>({})))
      this.noteService.menuNotes(this.numNotes);
    }
  }

}
