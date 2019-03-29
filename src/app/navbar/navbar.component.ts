import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../login/services.service';
import { Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`.navbar-nav > li a:hover{
    background:transparent;
    }
    .navbar-nav > li a:focus{
      background:transparent;
    }`],
  //styleUrls: ['./navbar.component.css']
  animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        transition('small <=> large', animate('100ms ease-in')),
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  state: string = 'small';
  homestate: string = 'small';
  videostate: string = 'small';
  dashboardstate: string = 'small';
  heroesstate: string = 'small';
  loginstate: string = 'small';
  registerstate: string = 'small';
  logoutstate: string = 'small';
  pistate: string = 'small';
  productstate: string = 'small';
  customerstate: string = 'small';
  companystate: string = 'small';

  constructor(
    private router : Router,
    private servicesService : ServicesService
  ) { }

  ngOnInit() {
  }
  isIn = false;
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
}
onLogout(){
  this.servicesService.logout();
  this.router.navigate(['/login']);
  return false;
}

homeEvent(){this.homestate = ((this.homestate) === 'small' ? 'large' : 'small');}
videoEvent(){this.videostate = ((this.videostate) === 'small' ? 'large' : 'small');}
dashboardEvent(){this.dashboardstate = ((this.dashboardstate) === 'small' ? 'large' : 'small');}
heroesEvent(){this.heroesstate = ((this.heroesstate) === 'small' ? 'large' : 'small');}
loginEvent(){this.loginstate = ((this.loginstate) === 'small' ? 'large' : 'small');}
registerEvent(){this.registerstate = ((this.registerstate) === 'small' ? 'large' : 'small');}
logoutEvent(){this.logoutstate = ((this.logoutstate) === 'small' ? 'large' : 'small');}

piEvent(){this.pistate = ((this.pistate) === 'small' ? 'large' : 'small');}

productEvent(){this.productstate = ((this.productstate) === 'small' ? 'large' : 'small');}
companyEvent(){this.companystate = ((this.companystate) === 'small' ? 'large' : 'small');}
customerEvent(){this.customerstate = ((this.customerstate) === 'small' ? 'large' : 'small');}

}
