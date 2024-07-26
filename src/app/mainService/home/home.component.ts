import { Component } from '@angular/core';
import { CardsComponent } from '../../subElement/cards/cards.component';
import { IdService } from '../../services/id.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private idService: IdService) {}

  ngOnInit(): void {
    this.idService.setDash(true)
  }

}
