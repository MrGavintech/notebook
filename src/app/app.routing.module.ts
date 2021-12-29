import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from "./note/note.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NoteHomeComponent} from "./note-home/note-home.component"; // CLI imports router

const routes: Routes = [
  {path: 'note/:id', component: NoteComponent},
  {path: '', component: NoteHomeComponent},
  {path: '**', component: NotFoundComponent}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
