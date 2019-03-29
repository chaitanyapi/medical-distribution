import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { ServicesService } from '../services.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Url = '/dashboard';
  constructor(private servicesService : ServicesService,
              private router : Router,
            private flashmessage : FlashMessagesService) { }

  ngOnInit() {
  }
  onSubmit(user : Users){
    this.servicesService.authenticateUser(user)
        .subscribe(data => {
          if(data.success){
            this.servicesService.storeToken(data.token, data.user);
            if(user.username === 'newuser'){
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
            
          } else {
            this.flashmessage.show('Incorrect Password', {cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/login']);
          }
        });

  }
}
