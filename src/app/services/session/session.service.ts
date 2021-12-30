import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  setSession(key: string, value: Array<any>): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  updateSession() {

  }

  getSession(key: string): Array<any> {
    let item = sessionStorage.getItem(key) === null ? [] :
      // @ts-ignore
      JSON.parse(sessionStorage.getItem(key));
    return item;
  }

}
