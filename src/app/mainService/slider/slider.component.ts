import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit  {

  showOtherJobType: boolean = false;
  isVisible: boolean = true;

  constructor(private navbarService: NavbarService){}

  ngOnInit() {
    this.navbarService.navbarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  openNotifications() {
    // Implement your logic here, such as showing a notification panel
    console.log('Opening notifications...');
    const modelDiv = document.getElementById('mobile-menu');
    this.showOtherJobType = !this.showOtherJobType;
  }
  

}
