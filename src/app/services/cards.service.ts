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
  private dataUrl2 = 'assets/jsons/combo.json';  

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getDataById(id: string): Observable<any> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getData1(): Observable<any> {
    return this.http.get<any>(this.dataUrl2);
  }

  getDataById1(id: string): Observable<any> {
    const url = `${this.dataUrl2}/${id}`;
    return this.http.get<any>(url);
  }
}
