import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Users } from './users';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ServicesService {

  authToken : any;
  user : any;

  public userUrl='/api/register';
  public authUrl = '/api/authenticate';
  public getProfileUrl = '/api/profile';
  constructor(private http: Http) { }

  addUser(user : Users){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.userUrl, JSON.stringify(user), options)
                .map((response:Response)=> response.json());
  }

  authenticateUser(user : Users){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.authUrl, JSON.stringify(user), options)
                .map((response:Response)=> response.json());
  }

  getProfile(){
    this.loadToken();
    let headers = new Headers({'Authorization':this.authToken,'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this.http.get(this.getProfileUrl,  options)
    .map((response:Response)=> response.json());
  }

  loadToken(){
    let token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  storeToken(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedin(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
