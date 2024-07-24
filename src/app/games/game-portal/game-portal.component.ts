import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-game-portal',
  standalone: true,
  imports: [],
  templateUrl: './game-portal.component.html',
  styleUrl: './game-portal.component.css'
})
export class GamePortalComponent implements OnInit, OnDestroy {

  safeUrl: any;

  @Input() gameNumber: number | any;
  
  constructor(private sanitizer: DomSanitizer, private navbarService: NavbarService){}
  ngOnInit(): void {
    this.getSafeUrl(this.gameNumber);
    this.navbarService.hideNavbar();
  }
 

  getSafeUrl(gameId: string): SafeResourceUrl {
    const url = `assets/games/game${gameId}/index.html`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  ngOnDestroy() {
    this.navbarService.showNavbar();
  }

}
