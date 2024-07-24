import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  public data: any[] = []; 
 

  constructor(private dataService: CardsService, private router: Router){}

  ngOnInit(): void {
  
    this.dataService.getData().subscribe((response) => {
      console.log(response);
      
      this.data = response.reverse();
    });
  }


}
