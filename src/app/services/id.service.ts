import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  // private tokenKey = 'Game_id';

  private tokenKey = 'token_game';

  private dsahBoard = "dash_board"

  
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  
  // Store token in local storage
  setToken(id: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, id);
    }
    return null;
  }

  
    // Retrieve token from local storage
    getToken(): string | null {
      if (this.isBrowser()) {
        return localStorage.getItem('token_game');
      }
      return null;
    }


      // Store token in local storage
  setDash(state: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.dsahBoard, state);
    }
    return null;
  }

  
    // Retrieve token from local storage
    getDash(): string | null {
      if (this.isBrowser()) {
        return localStorage.getItem('dash_board');
      }
      return null;
    }
  

  constructor() { }

  // Method to set the ID
  // setId(newId: number): void {
  //   this.id = newId;
  // }

  // Method to get the ID
  // getId(): number | null {
  //   return this.id;
  // }
}
