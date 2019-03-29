import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Customers } from '../customer';
import { Router } from '@angular/router';

@Component({
  selector: 'list-customer',
  templateUrl: './list-customer.component.html',
  //styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  @Output() public custInfo = new EventEmitter();
  @Output() public showPicture : boolean;
  @Input('customerList') 
  customerList : Array<string>;
  selectedCustomer : Customers;
  @Input() resultLength;
  // @Output() ;
  
  // itemResource = new DataTableResource(this.productList);
  items = [];
  itemCount = 0;

  
  constructor(private router : Router) { 
    //this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  onSelect(cust){
    this.showPicture=true;
    let obj ={
      cust : cust,
      show : this.showPicture
    };
this.custInfo.emit(obj);
  }

  routeUpdate(idVal : string){
    // this.supplyService.getRecord(idVal)
    //     .subscribe(record => 
    //       this.details = record
    //       // this.router.navigate(['/detail']);
    this.router.navigate(['/updatecustomer', idVal])};

}
