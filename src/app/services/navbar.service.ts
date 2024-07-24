// navbar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarVisibility = new BehaviorSubject<boolean>(true);
  navbarVisible$ = this.navbarVisibility.asObservable();

  hideNavbar() {
    this.navbarVisibility.next(false);
  }

  showNavbar() {
    this.navbarVisibility.next(true);
  }
}
