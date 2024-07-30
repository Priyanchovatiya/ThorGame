import { Component } from '@angular/core';
import { CardsComponent } from '../../subElement/cards/cards.component';

import { IdService } from '../../services/id.service';
import { CarddComponent } from '../../subElement/cardd/cardd.component';
import { GamePortalComponent } from '../../games/game-portal/game-portal.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent, CarddComponent, GamePortalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private idService: IdService) {}

  ngOnInit(): void {
    this.idService.setDash(true)
  }

}
