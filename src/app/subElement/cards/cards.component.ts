import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IdService } from '../../services/id.service';
import { LoadingComponent } from '../../mainService/loading/loading.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoadingComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  public data: any[] = []; 
   value: any;
   loading = false;
 

  constructor(private dataService: CardsService, private router: Router, private idService: IdService){}

  ngOnInit(): void {
   
    // console.log("ssdsfsdffd",this.idService.getDash());
    this.value = this.idService.getDash();
    this.loading = true;
    this.dataService.getData().subscribe((response) => {
      // console.log(response);
      this.data = response.reverse();
      this.loading = false;
    });
  }

  onGameClick(id: number): void {
    console.log("clicked");
    this,this.idService.setToken(id);
    // this.idService.setId(id);
    console.log("ssdsfsdffd",this.idService.getDash());
    console.log("ssdsfsdffd",this.value);
     // Use a small timeout to ensure state is updated
 

    // if(this.value == false){
    //   console.log("finally");
      
    // }
   
    // this.router.navigate(['/gamePage']);

    
      this.router.navigate(['/gamePage']).then(() => {
    
        setTimeout(() => {
          window.location.reload(); 
        }, 1); 
      });
    
  }

}
