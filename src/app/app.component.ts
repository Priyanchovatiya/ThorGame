import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SliderComponent } from './mainService/slider/slider.component';
import { filter } from 'rxjs';
declare let gtag: Function; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Thot Games - Ulock Your Fun';
  routeChange: any;
  // constructor(private router: Router){
  //  const navElement = router.events.pipe(
  //     filter(event  => event instanceof NavigationEnd)
  //   );
  //   navElement.subscribe((event: NavigationEnd) => {
  //     gtag('config', 'YOUR_TRACKING_ID');
  //   })
  // }

  constructor(private router: Router) {
    this.routeChange = router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        // "event" here is now of type "NavigationEnd"

        gtag('config', 'G-723SDVNGX7');
      });
  }
}
