import {Injectable} from '@angular/core';
import {Note} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  setSession(key: string, value: Array<any>): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession(key: string): any {
    const item = sessionStorage.getItem(key);
    return item === null ? [] :
      JSON.parse(item);
  }

}
