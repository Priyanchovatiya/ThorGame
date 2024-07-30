import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IdService } from '../../services/id.service';


@Component({
  selector: 'app-cardd',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cardd.component.html',
  styleUrl: './cardd.component.css'
})
export class CarddComponent  implements OnInit {

  public data: any[] = []; 
  value: any;


  constructor(private dataService: CardsService, private router: Router, private idService: IdService){}

  ngOnInit(): void {
   
    // console.log("ssdsfsdffd",this.idService.getDash());
    this.value = this.idService.getDash();
    this.dataService.getData1().subscribe((response) => {
      // console.log(response);
      
      this.data = response;
    });
  }

  onGameClick(id: number): void {
    console.log("clicked");
    this,this.idService.setName(id);
    // this.idService.setId(id);
    console.log("ssdsfsdffd",this.idService.getDash());
    console.log("ssdsfsdffd",this.value);


    
      this.router.navigate(['/gameoPage']).then(() => {
    
        setTimeout(() => {
          window.location.reload(); 
        }, 1); 
      });
    
  }

}
