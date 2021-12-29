import {Component, OnInit} from '@angular/core';
import {MenuService} from "./services/menu-service/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My notebook';
  numNotes = []

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let stuff = JSON.parse(sessionStorage.getItem('notes')) === null ? [] :
      // @ts-ignore
      JSON.parse(sessionStorage.getItem('notes'));
    if (stuff.length > 0) {
      this.numNotes = Array.from(stuff);
    }
    this.menuService.getMenuNotes()
      .subscribe(message => {
          this.numNotes = message;
        }
      )
  }

  clickId(note: any) {
    // this.title = note;
  }
}
