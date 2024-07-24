import { Component } from '@angular/core';
import { CardsComponent } from '../../subElement/cards/cards.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
