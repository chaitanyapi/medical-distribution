import { Injectable } from '@angular/core';
import { purchaseInvoice } from './purchaseInvoice';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PurchaseInvoiceService {

  constructor(private http : Http) { }

  public insertPurchaseInvoice = '/api/insertpurchaseinvoice';
  public updatePurchaseInvoice = '/api/updatepurchaseinvoice';
  public updateGenerateInvoice = '/api/updategenerateinvoice/';
  public pendingPurchaseInvoice = '/api/pendingPI';
  public getPurchaseInvoice = '/api/getpurchaseinvoice/';
  public findPICombination = '/api/findpicombination';

  generatePurchaseInvoice(PI){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.insertPurchaseInvoice, JSON.stringify(PI), options)
                .map((response:Response)=> response.json());
  }

  updatePI(PI, INV){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers, params:{INV:INV}});
    return this.http.put(this.updatePurchaseInvoice, JSON.stringify(PI), options)
                .map((response:Response)=> response.json());
  }

  updateGI(INV){
    return this.http.put(this.updateGenerateInvoice+INV, {params:{INV:INV}})
                    .map((response:Response)=> response.json());
  }

  pendingPI(){
    return this.http.get(this.pendingPurchaseInvoice)
                    .map((response : Response)=> response.json());
  }

  getPIDetails(INV){
    return this.http.get(this.getPurchaseInvoice+INV)
                    .map((response : Response)=> response.json());

  }

  checkDuplicateInvRecord(compname , invnum){
    let options = new RequestOptions({params:{compname:compname, invnum:invnum}});
    return this.http.get(this.findPICombination, options)
             .map((response:Response)=> response.json()); 
  }
}
