import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  //styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user : object;
  constructor(
    private servicesService : ServicesService,
    private router : Router
  ) { }

  ngOnInit() {
    this.servicesService.getProfile().subscribe(profile =>{
      this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
  })
  }

}
