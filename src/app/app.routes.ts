import { Routes } from '@angular/router';
import { HomeComponent } from './mainService/home/home.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { AvoutComponent } from './mainService/avout/avout.component';
import { PpComponent } from './mainService/pp/pp.component';
import { ContactComponent } from './mainService/contact/contact.component';
import { TouComponent } from './mainService/tou/tou.component';
import { AffilateComponent } from './mainService/affilate/affilate.component';
import { ErrorComponent } from './mainService/error/error.component';
import { ComboGameComponent } from './games/combo-game/combo-game.component';
import { BlogComponent } from './mainService/blog/blog.component';
import { FirstComponent } from './blog/first/first.component';
import { SecondComponent } from './blog/second/second.component';
import { ThreeComponent } from './blog/three/three.component';
import { FourComponent } from './blog/four/four.component';

export const routes: Routes = [

    // Intial Route
    {'path': '',redirectTo: '/home',pathMatch: 'full'},

    // Main Page Routes
    {'path': 'home',title: 'Home',loadComponent: () => import('./mainService/home/home.component').then(c => c.HomeComponent)},
    {'path': 'AboutUs',title: 'About Us',component: AvoutComponent},
    {'path': 'privacy-policy',title: 'Privacy-Policy',component: PpComponent},
    {'path': 'contact',title: 'contact',component: ContactComponent},
    {'path': 'terms-of-use',title: 'terms-of-use',component: TouComponent},
    {'path': 'affiliate',title: 'affiliate',component: AffilateComponent},
    {'path': 'blogs',title: 'blogs',component: BlogComponent},
    // {'path': '**',title: 'error',component: ErrorComponent},

    //blog routes
    {'path': 'first',title: 'first',component: FirstComponent},
    {'path': 'second',title: 'second',component: SecondComponent},
    {'path': 'three',title: 'three',component: ThreeComponent},
    {'path': 'four',title: 'four',component: FourComponent},

    // Games route
    {'path': 'gamePage',title: 'Game-Page',loadComponent: () => import('./games/game-page/game-page.component').then(c => c.GamePageComponent)},
    // {'path': 'gamesPage',title: 'GamesPage',component: ComboGameComponent},
    {'path': 'gamesPage/:gameName',title: 'GamesPage | GameName',component: ComboGameComponent},
    //1 - 10
    // {'path': 'animal-word',title: 'animal-word',component: Game2Component},
    // {'path': 'angry-potato',title: 'angry-potato',component: Game1Component},
    // {'path': 'coloring-book',title: 'coloring-book',component: Game3Component},
    // {'path': 'crazy-math',title: 'crazy-math',component: Game4Component},
    // {'path': 'crazy-parking',title: 'crazy-parking',component: Game5Component},
    // {'path': 'electrio',title: 'electrio',component: Game6Component},
    // {'path': 'Classic-bowling',title: 'Classic-bowling',component: Game7Component},
    // {'path': 'fishing-frenzy',title: 'fishing-frenzy',component: Game8Component},
    // {'path': 'flip-card',title: 'flip-card',component: Game9Component},
    // {'path': 'hold-card',title: 'hold-card',component: Game10Component},

    //11-20
    // {'path': 'Little-dino',title: 'Little-dino',component: Game11Component},
    // {'path': 'math',title: 'math',component: Game12Component},
    // {'path': 'ninja-run',title: 'ninja-run',component: Game13Component},
    // {'path': 'pac-circle',title: 'pac-circle',component: Game14Component},
    // {'path': 'football',title: 'football',component: Game15Component},
    // {'path': 'hol',title: 'hol',component: Game16Component},
    // {'path': 'hol',title: 'hol',component: Game17Component},
    // {'path': 'hol',title: 'hol',component: Game18Component},
    // {'path': 'hol',title: 'hol',component: Game19Component},
    // {'path': 'hol',title: 'hol',component: Game20Component},
];
