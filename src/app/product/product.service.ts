import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Products } from "./product";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http : Http) { }

  private listProd = "/api/products";
  private postProd = "/api/products";
  private getColurl = "/api/dropdownList";
  private updateProd = "/api/updateproduct";
  private getCompanyDetailurl = "/api/getcompanydetail/";
  private getProductDetailurl = "/api/getproductdetail/";

  getProducts(search, searchBy){
    return this.http.get(this.listProd, {params: {search: search, searchBy: searchBy}})
                    .map((response : Response)=> response.json());
  }


  addProduct(product : Products){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers, responseType:ResponseContentType.Blob});
    return this.http.post(this.postProd, JSON.stringify(product), options)
                .map((response:Response)=> response.json());
  }

  getCol(){
    return this.http.get(this.getColurl)
    .map((response : Response)=> response.json());
  }

  search(text: string, COMPNAME, TABNAME): Observable<any> {
        return this.http.get(this.getColurl, {params: {text : text, field : COMPNAME, tableName : TABNAME}})
        .map(res => res.json())
      }

      
  getRecord(id : string){
    return this.http.get(this.updateProd+'/'+id)
                    .map((response : Response) => response.json());
  }

  getCompanyDetail(name : string){
    return this.http.get(this.getCompanyDetailurl + name)
                    .map((response:Response)=> response.json());
  }

  getProductDetail(name : string){
    return this.http.get(this.getProductDetailurl + name)
                    .map((response:Response)=> response.json());
  }

  updateCustomer(value : Products, id : string){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers,params:{id:id}});
    return this.http.put(this.updateProd + '/' + id, JSON.stringify(value), options)
    .map((response:Response)=> response.json());
  }


}

