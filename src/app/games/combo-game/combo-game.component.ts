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
import { CarddComponent } from '../../subElement/cardd/cardd.component';

@Component({
  selector: 'app-combo-game',
  standalone: true,
  imports: [LoadingIndicatorComponent, CommonModule, CardsComponent, RouterLink, RouterLinkActive, GamePortalComponent, CarddComponent],
  templateUrl: './combo-game.component.html',
  styleUrl: './combo-game.component.css'
})
export class ComboGameComponent implements OnInit {
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
    this.gameId = this.idService.getName();
    
    
    this.idService.setDash(false)
 
    
    if (this.gameId) {
    
          this.loadGameDetails(this.gameId);
         
          
        }
  }


  loadGameDetails(id: string) {

  
    

    this.dataService.getData1().subscribe((response) => {
      this.id = this.gameId - 1;

      this.data = response;
      // console.log("response", this.data);
      // console.log(this.data);
      

      for(let i = 0; i < this.data.length; i++){
        // console.log(this.data[i]);
        
        if(response[i].id == id){
          // console.log(response[i].id);
          this.singleData = response[i];
          // console.log("dsdsd", this.singleData);
          
          this.tags = this.singleData.tags;
          this.getSafeUrl(this.gameId);
          
        }
      }
      


    });
  }

  getSafeUrl(gameId: string): SafeResourceUrl {
    const url = `combo/logos/{{gameId}}.png`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updatePage() {
    // this.pageDisplay = true;
       // Construct the URL using the gameId
       const url = `combo/games/${this.gameId}/index.html`;

       // Redirect to the constructed URL
       window.location.href = url;
  }
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
