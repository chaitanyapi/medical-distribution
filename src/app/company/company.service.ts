import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from "./company";

@Injectable()
export class CompanyService {

  constructor(private http : Http) { }
  private listComp = "/api/company";
  private getComp = "/api/updatecompany/";
  private deleteComp = "/api/deletedocument/";
  
  getCompany(search, searchBy){
    return this.http.get(this.listComp, {params: {search: search, searchBy: searchBy}})
                    .map((response : Response)=> response.json());
  }


  addCompany(company : Company){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});//, responseType:ResponseContentType.Blob});
    return this.http.post(this.listComp, JSON.stringify(company), options)
                .map((response:Response)=> response.json());
  }

  updateCustomer(value : Company, id : string){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers,params:{id:id}});
    return this.http.put(this.getComp + id, JSON.stringify(value), options)
    .map((response:Response)=> response.json());
  }

  getRecord(id : string){
    return this.http.get(this.getComp+id)
                    .map((response : Response) => response.json());
  }

  deleteDocument(id : string){
    return this.http.delete(this.deleteComp + id, {params : {table_name:"company"}})
                    .map((response : Response) => response.json());
  }
}
