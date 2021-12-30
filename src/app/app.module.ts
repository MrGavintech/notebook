import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {NoteComponent} from './note/note.component';
import {AppRoutingModule} from "./app.routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NoteHomeComponent} from './note-home/note-home.component';
import {NoteService} from "./services/note/note.service";

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NotFoundComponent,
    NoteHomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
