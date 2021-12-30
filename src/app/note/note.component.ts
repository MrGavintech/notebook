import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface Note {
  id: string;
  text?: string;
  date: string;
}

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getNote();
    this.saveNote();
  }

  getNote() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get(('id'));
      this.note.text = '';
      // @ts-ignore
      this.note = sessionStorage.getItem('note' + this.id) === null ? <Note>({}) :
        // @ts-ignore
        JSON.parse(sessionStorage.getItem('note' + this.id));
      this.form.controls['noteTextArea'].setValue(this.note.text);
    })
  }

  saveNote() {
    // @ts-ignore
    fromEvent(document.querySelector('textarea'), 'keyup')
      .pipe(
        // @ts-ignore
        map((event) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        sessionStorage.setItem('note' + this.id, JSON.stringify(<Note>({
          id: this.id,
          text: value,
          date: ''
        })))
      });
  }

}
