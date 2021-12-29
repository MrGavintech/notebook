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
    let menuNotes = JSON.parse(sessionStorage.getItem('notes')) === null ? [] :
      // @ts-ignore
      JSON.parse(sessionStorage.getItem('notes'));
    if (menuNotes.length > 0) {
      this.numNotes = Array.from(menuNotes);
    }
    this.menuService.getMenuNotes()
      .subscribe(menuNotes => {
          this.numNotes = menuNotes;
        }
      )
  }

  clickId(note: any) {
    // this.title = note;
  }
}
