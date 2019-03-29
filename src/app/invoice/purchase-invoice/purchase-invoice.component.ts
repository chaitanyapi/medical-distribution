import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../product/product.service' 
// import { Subject } from 'rxjs/Subject';
import { Products } from '../../product/product';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseInvoiceService } from '../purchase-invoice.service';
import { purchaseInvoice } from '../purchaseInvoice';
import { FlashMessagesService } from 'angular2-flash-messages';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css'],
  animations: [
    
        trigger('listAnimation', [
          transition('* => *', [
    
            query(':enter', style({ opacity: 0 }), {optional: true}),
    
            query(':enter', stagger('300ms', [
              animate('1s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
              ]))]), {optional: true})
          ])
        ])
    
      ]
})
export class PurchaseInvoiceComponent implements OnInit {
  mssg: string;
  maxDaysInMonth: number;
  fullYear: number;
  date: Date;
  leapYear: boolean = false;
  invalidFullDate: boolean=true;
  invoiceNumberMessage: string;
  invNumButtonOn: boolean = true;

  disablePIButton: boolean;
  INVOICENUMBER: any;
  INVOICEDATE: any;
  DEBITNOTE: any;
  CREDITNOTE: any;
  pendingPiButton : boolean = true;
  resultSet: any;
  info: string;
  editGI: boolean;
  invalidDate: boolean = false;
  msg: string;
  net_amt: number=0;
  disc_value: number=0;
  offer_value: number=0;
  tax_value: number=0;
  inv_value: number=0;
  arrayCount: number=0;
  refInvoince: number = 0;
  EXPIRYDATE: string;
  showForm: boolean = true;
  year: any;
  month: any;
  COMPANYNAME: any;
  editTitle : boolean = true;
  freezeForm: boolean = true;
  resultvar: string;
  BPAK: any;
  TAX: any;
  MRP: any;
  PRATE: number;
  RECEIPT: number;
  RATE: any;
  SRATE: any;
  PRODPACK: any;
  PRODUCTCODE: any;
  NET : number=0;
  prods: any;
  calanderMonthDays={};
  // private searchTerm = new Subject<string>();
  COMPANYCODE: any;
  comps: any;
  showArray : boolean = false;
  showEnterProductForm : boolean = true;
  showEditProductForm : boolean = false;
  showAddProductInvoiceButton : boolean = false;
  obj = {};
  arr = [];
  editableObject={};
  
  constructor(
              private productService : ProductService,
              private config: NgbTypeaheadConfig,
              private purchaseInvoice : PurchaseInvoiceService,
              private flashMessage : FlashMessagesService,
              // private fb: FormBuilder
            ) { 
              config.showHint = true; 
            }

  ngOnInit() {}


  formatter = (result: string) => result.toUpperCase();
  
  searchTxt = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 1 ? []
      : this.comps);  
  
  searchProd = (searchval: Observable<string>) =>
  searchval
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => 
      term === '' ? []: this.prods);  

      
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//these are the functions for the company form

  onKeyup(searchText : string){
    this.freezeForm=true;
    this.showAddProductInvoiceButton = false;
    // this.COMPANYCODE = this.COMPANYCODE !='' ? this.COMPANYCODE: '';
          this.productService.search(searchText,"COMPANYNAME","company").subscribe(response => {
            this.comps = response;
            if (this.comps.length < 1){
              this.COMPANYCODE = '';
            }
          });
      }
  companyDetail(value : string){
    this.COMPANYNAME = value['item'];
        this.productService.getCompanyDetail(value['item'])
                            .subscribe(name => {
                              this.COMPANYCODE = name["COMPANYCODE"]});
      }

  onSubmit(value : Products){
        this.obj = value;
        this.obj["COMPANYCODE"]= this.COMPANYCODE;
        this.freezeForm = false;
        this.editTitle = false;
    }
  
  // this function will be used to check that the same invoice number is not used multiple times for generating PI
  //for this the unique key is a composit primary key with combination of company name + invoice number
  checkInvConstraint(compName, invNum){
    this.invNumButtonOn=true;
    this.purchaseInvoice.checkDuplicateInvRecord(compName, invNum.toUpperCase())
                        .subscribe(result => {
                          if(result["msg"]==="found another name"){
                            this.invNumButtonOn=false;
                            this.invoiceNumberMessage="Purchase Invoice already created for this Invoice Number";
                          }
                        })

  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// now the functions related to product details entry

// below 2 are the functions required for typeahead search and data fetch

  onKeyupProd(searchText : string){
    this.pendingPiButton = false;
      this.productService.search(searchText,"PRODUCTNAME","product").subscribe(response => {
          this.prods = response;
          if (this.prods.length < 1){
            this.PRODUCTCODE = '';
            this.PRODPACK = '';
            this.SRATE = '';
            this.RATE = '';
            this.PRATE = 0;
            this.MRP = '';
            this.TAX = '';
            this.BPAK = '';
          }
      });
  }

  productDetail(value : string){
    this.productService.getProductDetail(value['item'])
                        .subscribe(name => {
                          this.PRODUCTCODE = name["PRODUCTCODE"];
                          this.PRODPACK = name["PRODPACK"];
                          this.SRATE = name["SRATE"];
                          this.RATE = name["RATE"];
                          this.PRATE = name["PRATE"];
                          this.MRP = name["MRP"];
                          this.TAX = name["TAX"];
                          this.BPAK = name["BPAK"];
                        });
  }

  // this validates the date value entered in expiry date column
  validateDate(dt,i){
    this.msg='';
    this.date = new Date();
    this.fullYear=this.date.getFullYear();
    this.invalidDate = false;
    this.invalidFullDate = true;
    this.calanderMonthDays={
      30:[4,6,9,11],
      31:[1,3,5,7,8,10,12],
      28:[2],
    }
    this.month=parseInt(dt.split('/')[dt.split('/').length - 2]);
    this.year = parseInt('20'+dt.split('/')[dt.split('/').length - 1]); //this will convert 2 digit year into 4 digit and convert to number format
    // this.year = (this.year < 100)? this.year: '20'+this.year;
    this.leapYear = (((this.year % 4 == 0) && (this.year % 100 != 0)) || (this.year % 400 == 0))? true : false;
    Object.keys(this.calanderMonthDays).forEach((days)=>{
      if(this.calanderMonthDays[days].includes(this.month) && !this.leapYear){
        this.maxDaysInMonth=parseInt(days);
      }
      if(this.leapYear && (this.month === 2)){
        this.maxDaysInMonth=29;
      }
    })
    if((dt.length === 5 || dt.length === 4) && i===0){
      if(this.year>=this.fullYear && this.year<=this.fullYear+7 && dt.split('/')[0]>0 && dt.split('/')[0]<=12){//&& dt.split('/')[1]>17 && dt.split('/')[1]<30 || dt.length<1){
            this.invalidDate = false;
          }else {
            this.msg = "* Valid date format is mm/yy. Expiry date can be maximum of 7 years from this year";
            this.invalidDate = true;
          }
    }
    // the below check has a side effect. this validates with the current year.
    //for example if the original invoice got generated on 31-dec and we are creating PI on 1-jan, the validation fails.
    //as of now i am trying the logic excluding the above issue.
    if((dt.length > 5 && dt.length < 11) && i===1){
      if((this.year===this.fullYear || this.year===this.fullYear-1) && dt.split('/')[0]<=this.maxDaysInMonth && dt.split('/')[1]>0 && dt.split('/')[1]<=12 ){//&& dt.split('/')[1]>17 && dt.split('/')[1]<30 || dt.length<1){
        this.invalidFullDate = true;
          }else {
            this.mssg = "* Enter valid date.";
            this.invalidFullDate = false;
          }
    }
  }

  //these both functions caluclate the value of net amount from the qunatity and p.rate values
  calculateNetFromPrate(rate,qty){
      this.NET = rate * qty;
    
  }

  caluclateNetFromReceipt(rate,receipt){
    this.NET = rate * receipt;
  }


// this is the function for sbmitting the form data 
  onEnterProductSubmit(value){
    value["PRODUCTCODE"]=this.PRODUCTCODE;
    value["PRODPACK"]=this.PRODPACK;
    value["TAX"]=this.TAX;
    value["BPAK"]=this.BPAK;
    value["NET"]=this.NET;
    this.arr.unshift(value);
    this.obj["DETAILS"]= this.arr;
    this.obj["REFINVOICENUMBER"] = this.refInvoince;
    this.obj["GENERATEDINVOICE"]="NO";
    this.obj["UPDATING"]="YES";
    // this.PRODUCTCODE='';
    this.inv_value=0;
    this.tax_value=0;
    this.offer_value=0;
    this.disc_value=0;
    this.net_amt=0;
    this.arr.forEach((item)=>{
                      this.inv_value=this.inv_value+ item["NET"] ;
                      this.tax_value=this.tax_value+(item["NET"]*item["TAX"]/100);
                      this.offer_value=this.offer_value+(item["NET"]*item["OFPN"]/100);
                      this.disc_value=this.disc_value+(item["DISCOUNT"]*item["NET"]/100);
                      this.net_amt=this.inv_value+this.tax_value+this.offer_value-this.disc_value;
                      this.obj["DISCOUNT"]=this.disc_value
                      this.obj["INVVALUE"]=this.inv_value
                      this.obj["TAXVALUE"]=this.tax_value
                      this.obj["OFFERVAL"]=this.offer_value
                      this.obj["NETAMT"]=this.net_amt
    })
    // this if condition checks for reference invoice value. in case the we are entering the first product then the value will be 0.
    //in that case the fist if will be served and the refinvoice number will be generated from database.
    // else it will be updated to the array of product details variable "this.arr"
    if(this.refInvoince === 0){
      this.purchaseInvoice.generatePurchaseInvoice(this.obj)
          .subscribe( newProduct => {  
            this.refInvoince = newProduct["REFINVOICENUMBER"];
          })
    }else{
      this.purchaseInvoice.updatePI(this.obj, this.refInvoince)
          .subscribe(updatedProduct =>{
          })
    }
    this.arrayCount = this.arr.length;
    if(this.arr.length > 0){        // this ensures that the array has atleast one row for confirming the purchase invoice.
      this.showAddProductInvoiceButton = true; 
    }
    this.showArray = true;
    this.showEnterProductForm = false;
  }

  showEnterProduct(){
    
        this.showArray = false;
        this.showEnterProductForm = true;
      }

  showPendingPI(){
    this.purchaseInvoice.pendingPI()
                        .subscribe(resultSet=>{
                          this.resultSet=resultSet;
                        })
  }

  generateProductInvoice(val){
    if(val===1){
  this.purchaseInvoice.updateGI(this.refInvoince)
          .subscribe( newProduct => {  
            this.showForm = false;});
    }
    if(val===0){
      this.showForm = true;
      this.refInvoince=0;
    }
    this.inv_value=0;
    this.tax_value=0;
    this.offer_value=0;
    this.disc_value=0;
    this.net_amt=0;
    this.arrayCount=0;
    this.arr=[];
    this.obj={};
    this.pendingPiButton = true;
    this.showAddProductInvoiceButton = false;
    this.freezeForm = true;
    this.showArray = false;
    this.editTitle = true;
    this.COMPANYCODE='';
    this.COMPANYNAME='';
    this.PRODUCTCODE='';
    this.disablePIButton = true;
    this.INVOICENUMBER='';
    this.INVOICEDATE='';
    this.CREDITNOTE='';
    this.DEBITNOTE='';
    this.disablePIButton = false;
  }

  closePendingSet(){
    this.resultSet=0;
  }

  // these are the functions used for editing the already entered product details.

  editEnteredProduct(editableObject, i){
    this.editableObject = editableObject;
    this.editableObject["index"]=i;
    this.NET=this.editableObject["NET"];
    this.PRODUCTCODE=this.editableObject["PRODUCTCODE"];
    this.showEditProductForm = true;
    this.showEnterProductForm = false
    this.showAddProductInvoiceButton = false;

  }

  onEditProductSubmit(editableValue){
    editableValue["PRODUCTCODE"]=this.editableObject["PRODUCTCODE"];
    editableValue["PRODPACK"]=this.editableObject["PRODPACK"];
    editableValue["TAX"]=this.editableObject["TAX"];
    editableValue["BPAK"]=this.editableObject["BPAK"];
    editableValue["NET"] = this.NET;
    this.obj["REFINVOICENUMBER"] = this.refInvoince;
    this.obj["GENERATEDINVOICE"]="NO";
    this.obj["UPDATING"]="YES";
    this.arr[editableValue["index"]]= editableValue;
    this.obj["DETAILS"]= this.arr;
    this.NET=0;
    this.PRODUCTCODE='';
    this.showEditProductForm = false;
    this.showArray = true;
    this.showAddProductInvoiceButton = true;
    this.inv_value=0;
    this.tax_value=0;
    this.offer_value=0;
    this.disc_value=0;
    this.net_amt=0;
    this.arr.forEach((item)=>{
                      this.inv_value=this.inv_value+ item["NET"] ;
                      this.tax_value=this.tax_value+(item["NET"]*item["TAX"]/100);
                      this.offer_value=this.offer_value+(item["NET"]*item["OFPN"]/100);
                      this.disc_value=this.disc_value+(item["DISCOUNT"]*item["NET"]/100);
                      this.net_amt=this.inv_value+this.tax_value+this.offer_value-this.disc_value;
                      this.obj["DISCOUNT"]=this.disc_value
                      this.obj["INVVALUE"]=this.inv_value
                      this.obj["TAXVALUE"]=this.tax_value
                      this.obj["OFFERVAL"]=this.offer_value
                      this.obj["NETAMT"]=this.net_amt
    })
    this.purchaseInvoice.updatePI(this.obj, this.refInvoince)
    .subscribe(updatedProduct =>{
    })
  }

  cancelEditProduct(){
    this.NET=0;
    this.PRODUCTCODE='';
    this.showEditProductForm = false;
    this.showArray = true;
    this.showAddProductInvoiceButton = true;
  }

  removeEnteredProduct(i){
    this.arr.splice(i,1);
    this.obj["DETAILS"]= this.arr;    
    this.arr.forEach((item)=>{
      this.inv_value=this.inv_value+ item["NET"] ;
      this.tax_value=this.tax_value+(item["NET"]*item["TAX"]/100);
      this.offer_value=this.offer_value+(item["NET"]*item["OFPN"]/100);
      this.disc_value=this.disc_value+(item["DISCOUNT"]*item["NET"]/100);
      this.net_amt=this.inv_value+this.tax_value+this.offer_value-this.disc_value;
      this.obj["DISCOUNT"]=this.disc_value
      this.obj["INVVALUE"]=this.inv_value
      this.obj["TAXVALUE"]=this.tax_value
      this.obj["OFFERVAL"]=this.offer_value
      this.obj["NETAMT"]=this.net_amt
      });

    this.purchaseInvoice.updatePI(this.obj, this.refInvoince)
    .subscribe(updatedProduct =>{
    })

    this.arrayCount = this.arr.length;
    if(this.arr.length<1){
      this.showArray = false;
      this.showAddProductInvoiceButton = false;
      this.inv_value=0;
      this.tax_value=0;
      this.offer_value=0;
      this.disc_value=0;
      this.net_amt=0;
    }
  }

  checkGIButton(){
    this.showAddProductInvoiceButton = (this.arr.length > 0)? true : false;
  }
  changeEditTitle(){
    this.editTitle=true;
    this.freezeForm = true;
    this.showAddProductInvoiceButton = (this.arr.length>0)? true:false;
  }

  changeshowForm(){
    this.showForm=true;
    this.refInvoince=0;
  }

  getPIDetails(i){
    this.purchaseInvoice.getPIDetails(i)
                        .subscribe(details =>{
                          this.COMPANYNAME = details[0]["COMPANYNAME"];
                          this.COMPANYCODE = details[0]["COMPANYCODE"];
                          this.CREDITNOTE = details[0]["CREDITNOTE"];
                          this.DEBITNOTE = details[0]["DEBITNOTE"];
                          this.INVOICEDATE = details[0]["INVOICEDATE"];
                          this.INVOICENUMBER = details[0]["INVOICENUMBER"];
                          this.disc_value = details[0]["DISCOUNT"];
                          this.inv_value = details[0]["INVVALUE"];
                          this.tax_value = details[0]["TAXVALUE"];
                          this.offer_value = details[0]["OFFERVAL"];
                          this.net_amt = details[0]["NETAMT"];
                          this.refInvoince = i
                          this.arr = details[0]["DETAILS"];
                          this.resultSet = 0; // we set this value to disappear the pending PI values list.
                          // this.pendingPiButton = true;
                          this.disablePIButton = true;
                          this.editTitle = false;
                          this.showArray = true;
                          this.showAddProductInvoiceButton = true;
                          this.freezeForm = false;
                          this.invalidDate = false;
                        })

  }
}
