import {Component, OnInit} from '@angular/core';
import {MenuService} from "../services/menu-service/menu.service";
import {Note} from "../note/note.component";

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.css']
})
export class NoteHomeComponent implements OnInit {
  numNotes = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.numNotes = sessionStorage.getItem('notes') === null ? [] : JSON.parse(sessionStorage.getItem('notes'));
    this.menuService.menuNotes(this.numNotes);
  }

  addNote() {
    if (this.numNotes.length < 5) {
      // @ts-ignore
      this.numNotes.push(this.numNotes.length + 1);
      sessionStorage.setItem('notes', JSON.stringify(this.numNotes));
      this.menuService.menuNotes(this.numNotes);
    }
  }

  removeNote() {
    if (this.numNotes.length > 0) {
      // @ts-ignore
      let id = this.numNotes.pop();
      sessionStorage.setItem('notes', JSON.stringify(this.numNotes));
      sessionStorage.setItem('note' + id, JSON.stringify(<Note>({})))
      this.menuService.menuNotes(this.numNotes);
    }
  }
}
