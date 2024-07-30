import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IdService } from '../../services/id.service';


@Component({
  selector: 'app-card2',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './card2.component.html',
  styleUrl: './card2.component.css'
})
export class Card2Component implements OnInit {

  public data: any[] = []; 
  value: any;

  constructor(private dataService: CardsService, private router: Router, private idService: IdService){}


  ngOnInit(): void {
   
    // console.log("ssdsfsdffd",this.idService.getDash());
    this.value = this.idService.getDash();
    this.dataService.getData1().subscribe((response) => {
      // console.log(response);
      
      this.data = response.reverse();
    });
  }

  onGameClick(id: number): void {
    console.log("clicked");
    this,this.idService.setName(id);
    // this.idService.setId(id);
    console.log("ssdsfsdffd",this.idService.getDash());
    console.log("ssdsfsdffd",this.value);


    
      this.router.navigate(['/gamePage']).then(() => {
    
        setTimeout(() => {
          window.location.reload(); 
        }, 1); 
      });
    
  }

}
