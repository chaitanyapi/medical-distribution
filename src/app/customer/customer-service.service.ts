import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Customers } from "./customer";

@Injectable()
export class CustomerServiceService {

  constructor(private http : Http) { }

  private listProd = "/api/customers";
  private postProd = "/api/customers";
  private updateCust = "/api/customers/";
  private getComp = "/api/updatecustomer/";
  
  getCustomers(search, searchBy){
    return this.http.get(this.listProd, {params: {search: search, searchBy: searchBy}})
                    .map((response : Response)=> response.json());
  }


  addCustomer(customer : Customers){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});//, responseType:ResponseContentType.Blob});
    return this.http.post(this.postProd, JSON.stringify(customer), options)
                .map((response:Response)=> response.json());
  }

  updateCustomer(value : Customers, id : string){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers,params:{id:id}});
    return this.http.put(this.updateCust + id, JSON.stringify(value), options)
    .map((response:Response)=> response.json());
  }

  getRecord(id : string){
    return this.http.get(this.getComp+id)
                    .map((response : Response) => response.json());
  }
}