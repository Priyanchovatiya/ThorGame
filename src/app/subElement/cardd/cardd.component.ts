import { Component, OnInit,Input, booleanAttribute, EventEmitter, Output, } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IdService } from '../../services/id.service';
import { LoadingComponent } from '../../mainService/loading/loading.component';


@Component({
  selector: 'app-cardd',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoadingComponent],
  templateUrl: './cardd.component.html',
  styleUrl: './cardd.component.css'
})
export class CarddComponent  implements OnInit {

  @Input({ transform: booleanAttribute }) pageReload: boolean = false;

  @Output() loadGameDetails: EventEmitter<any> = new EventEmitter();


  public data: any[] = []; 
  value: any;
  loading = true;


  constructor(private dataService: CardsService, private router: Router, private idService: IdService){}

  ngOnInit(): void {
    this.loading = true;
   
    // console.log("ssdsfsdffd",this.idService.getDash());
    this.value = this.idService.getDash();
    this.dataService.getData1().subscribe((response) => {

      this.data = response;
      this.loading = false;
    });
    // setTimeout(() => {
    //   this.idService.setDash(true); // or fetch your data here
    //   this.loading = false; // Set loading to false when the data has been fetched
    // }, 1500);
  }

  // onGameClick(id: number): void {
  //   console.log("clicked");
  //   this,this.idService.setName(id);
  //   // this.idService.setId(id);
  //   console.log("ssdsfsdffd",this.idService.getDash());
  //   console.log("ssdsfsdffd",this.value);


    
  //     this.router.navigate(['/gameoPage']).then(() => {
    
  //       setTimeout(() => {
  //         window.location.reload(); 
  //       }, 1); 
  //     });
    
  // }

  onGameClick(id: number): void {
    // console.log("clicked");
    // this,
    this.idService.setName(id);
    // this.idService.setId(id);
    console.log('on game click', this.idService.getDash(), this.value, id);

    this.router.navigate(['/gamesPage']).then(() => {
      // if not a home page then reload
      if (this.pageReload) this.loadGameDetails.emit(id);
      setTimeout(() => {
        // window.location.reload();
        window.scrollTo(0, 0);
      }, 1);
    });
  }


}
