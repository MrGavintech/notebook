import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Note} from "../app.component";
import {SessionService} from "../services/session/session.service";
import {NoteService} from "../services/note/note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  id: string | null | undefined;
  note: Note = <Note>({});
  form: FormGroup = this.fb.group({
    noteTextArea: []
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private sessionService: SessionService,
              private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getNoteId();
    this.saveOnKeyup();
  }

  getNoteId() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get(('id'));
      this.note.text = '';
      this.getNote();
    })
  }

  getNote() {
    let note = this.noteService.findNote(this.id);
    this.form.controls['noteTextArea'].setValue(note.text);
  }

  saveOnKeyup() {
    const textAreaEl: HTMLTextAreaElement | null = document.querySelector('textarea');
    let textArea = textAreaEl === null ? <any>{} : textAreaEl;
    fromEvent(textArea, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(200),
        distinctUntilChanged(),
      )
      .subscribe((textAreaData) => {
        let notes = this.sessionService.getSession('notes');
        let note = this.noteService.findNote(this.id);
        this.noteService.updateNote(textAreaData, note, notes);
      });
  }

  removeNote() {
    let notes = this.sessionService.getSession('notes');
    let note = this.noteService.findNote(this.id);
    this.noteService.removeNote(note, notes);
    this.noteService.triggerSelectedNote(<Note>({}))
  }
}
