import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ServicesService } from './login/services.service';


@Injectable()
export class Guard implements CanActivate {
    
    constructor(
        private servicesService : ServicesService,
        private router : Router
    ){ }

    canActivate(){
        if(this.servicesService.loggedin()){
            return true;
        } else {
            this.router.navigate(['/login']);
            //return false;
        }
    }
}