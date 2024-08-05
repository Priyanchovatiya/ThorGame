import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
  isNavbarActive: boolean = false;

  constructor(private navbarService: NavbarService, private renderer: Renderer2, private el: ElementRef){}

  ngOnInit() {
    this.navbarService.navbarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });

    const mobileNavButton = this.el.nativeElement.querySelector('.mobile-navbar-btn');
    const navHeader = this.el.nativeElement.querySelector('.header');

    
  }

  openNotifications() {
    // Implement your logic here, such as showing a notification panel
    console.log('Opening notifications...');
    const modelDiv = document.getElementById('mobile-menu');
    this.showOtherJobType = !this.showOtherJobType;
  }

  toggleNavbar(): void {
    this.isNavbarActive = !this.isNavbarActive;
  }


  

}
