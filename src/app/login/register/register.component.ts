import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { ServicesService } from '../services.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
  //styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servicesservice : ServicesService,
              private flashmessage : FlashMessagesService,
              private router : Router
            ) { }

  ngOnInit() {
  }

  onSubmit(user : Users){
    this.servicesservice.addUser(user)
        .subscribe(response => {
          if(response.success){
            this.flashmessage.show('You are now registered', {cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/login']);
          } else {
            this.flashmessage.show('You are not registered', {cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);
          }
        })
  }
}
