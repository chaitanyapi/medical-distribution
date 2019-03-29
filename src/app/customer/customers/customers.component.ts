import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { Customers } from "../customer";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FetchImageService } from '../../fetch-image.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { DomSanitizer } from '@angular/platform-browser';
import { CustomerServiceService } from '../customer-service.service';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

const states = ['CUSTCODE', 'CUSTNAME', 'PRODSUPP', 'SUPPNAME', 'suppcode'];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  img: any;
  productInfo: string;

  fileName: string;
  showPicture : boolean= false;
  resultLength : number = null;
  hidden : boolean = true;
  customers : Array<Customers> = null;
  image : string;
  respImage;
  searchBy: any;

  formatter = (result: string) => result.toUpperCase();
  
    
  // @ViewChild('fieldRef') el:ElementRef;
  
  constructor(
    private customerService : CustomerServiceService,
    private flashMessage : FlashMessagesService,
    private fetchImage : FetchImageService,
    private config: NgbTypeaheadConfig
  ) { 
    config.showHint = true; }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term === '' ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  // changeListener(){
  //   var file:File = this.el.nativeElement.files[0];
  //   var myReader:FileReader = new FileReader();
  
  //   myReader.onloadend = (e) => {
  //     this.image = myReader.result;
  //     this.fileName = file.name;
  //   }
  //   myReader.readAsDataURL(file);
  // }

  onSubmit(value : Customers){
    // value.PRODPIC = this.image;
    // value.fileName = this.fileName;
    this.customerService.addCustomer(value)
    .subscribe( newCustomer => {   
      this.hidden=true;
      this.flashMessage.show("Customer added succesfully to database",{cssClass:"alert-success", timeout:3000});
    })
  }

  fetchData(search, searchBy){
    this.customerService.getCustomers(search, searchBy)
    .subscribe(resProdData=>{
      this.customers = resProdData;
    this.resultLength = this.customers.length;
    this.showPicture = false;
  });
  }


  changeHidden(hiddenval){
    this.hidden=hiddenval;
  }
    
  // getProduct(){}

  onClick(){
    this.hidden=false;
  }
  cancel(){
    this.hidden=true;
  }
}
