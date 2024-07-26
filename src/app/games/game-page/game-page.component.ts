import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';
import { interval, timer } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CardsComponent } from '../../subElement/cards/cards.component';
import { ScrollService } from '../../services/scroll.service';
import { GamePortalComponent } from '../game-portal/game-portal.component';
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [LoadingIndicatorComponent, CommonModule, CardsComponent, RouterLink, RouterLinkActive, GamePortalComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {
  public data: any[] = [];
  tags: string[] | any
  gameId: any;
  id: any;
  gameData: any;
  isLoading = true;
  pageDisplay : boolean = false
  safeUrl: any;
  loading = true;
  singleData: any;
  routeSubscription: any;

  constructor(private router: Router ,private route: ActivatedRoute,  private idService: IdService, private dataService: CardsService, private sanitizer: DomSanitizer, private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.gameId = this.idService.getId();
    if (this.gameId) {
          this.loadGameDetails(this.gameId);
        }

    // this.route.queryParams.subscribe((params: Params) => {
    //   this.gameId = params['id'];
    //   if (this.gameId) {
    //     this.loadGameDetails(this.gameId);
    //   }
    // });

    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Type guard to ensure event is NavigationEnd
    // ).subscribe((event: NavigationEnd) => {
    //   // Check if the navigation is to the specific route
    //   if (event.urlAfterRedirects.startsWith('/Game-Page')) {
    //     this.reloadGamePage();
    //   }
    // });

  }

  loadGameDetails(id: string) {

    this.dataService.getData().subscribe((response) => {
      this.id = this.gameId - 1;

      this.data = response;
      this.singleData = response[this.id];
      this.tags = this.singleData.tags;
      console.log(this.tags);
      
      this.getSafeUrl(this.gameId);

    });
  }

  getSafeUrl(gameId: string): SafeResourceUrl {
    const url = `assets/games/game${gameId}/index.html`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updatePage() {
    // this.pageDisplay = true;
       // Construct the URL using the gameId
       const url = `games/game${this.gameId}/index.html`;

       // Redirect to the constructed URL
       window.location.href = url;
  }
  // getDataById(id: string): void {
  //   this.dataService.getDataById(id).subscribe(data => {
  //     this.singleData = data;
  //     console.log(this.singleData);

  //   });
  // }

  reloadGamePage(): void {
    // Logic to refresh the game page content
    console.log('Reloading Game Page content...');
    const gamePageElement = document.querySelector('app-game-page');
    if (gamePageElement) {
      gamePageElement.innerHTML = '';
      // Trigger change detection
      (gamePageElement as any).ngOnInit();
    }
  }

}