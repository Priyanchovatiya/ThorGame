import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GaService {

  // constructor(private router: Router) {
  //   // Subscribe to router events and filter for NavigationEnd events
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd): any => {
  //     this.sendPageView(event.urlAfterRedirects);
  //   });
  // }
  // Send page view information to Google Analytics
  sendPageView(url: string) {
    gtag('config', 'YOUR_TRACKING_ID', {
      'page_path': url
    });
  }

  // Send custom event information to Google Analytics
  sendEvent(eventCategory: string, eventAction: string, eventLabel: any = null, eventValue: any = null) {
    gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    });
  }
}
