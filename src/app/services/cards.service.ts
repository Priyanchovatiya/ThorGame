import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  // getGameById(gameId: any): any {
  //   throw new Error('Method not implemented.');
  // }

  private dataUrl = 'assets/jsons/games.json';  

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getDataById(id: string): Observable<any> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
