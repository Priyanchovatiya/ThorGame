import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute, Params, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { CardsComponent } from '../../subElement/cards/cards.component';
import { ScrollService } from '../../services/scroll.service';
import { GamePortalComponent } from '../game-portal/game-portal.component';

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

  constructor(private route: ActivatedRoute, private dataService: CardsService, private sanitizer: DomSanitizer, private scrollService: ScrollService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.loadGameDetails(this.gameId);
      }
    });


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
    this.pageDisplay = true;
  }
  // getDataById(id: string): void {
  //   this.dataService.getDataById(id).subscribe(data => {
  //     this.singleData = data;
  //     console.log(this.singleData);

  //   });
  // }

}


