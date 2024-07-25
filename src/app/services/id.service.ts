import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private id: number | any = 1;

  constructor() { }

  // Method to set the ID
  setId(newId: number): void {
    this.id = newId;
  }

  // Method to get the ID
  getId(): number | null {
    return this.id;
  }
}
