import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Products } from '../product';
import { Router } from '@angular/router';
// import { DataTableResource } from 'angular-2-data-table';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  //styleUrls: ['./list-products.component.css']
  //outputs : ['prodInfo']
})
export class ListProductsComponent implements OnInit {

  @Output() public prodInfo = new EventEmitter();
  @Output() public showPicture : boolean;
  @Input('productList') 
  productList : Array<string>;
  selectedProduct : Products;
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

  onSelect(prod){

    this.showPicture=true;
    let obj ={
      prod : prod,
      show : this.showPicture
    };
this.prodInfo.emit(obj);
  }

  routeUpdate(idVal : string){
    this.router.navigate(['/updateproduct', idVal]);
  }
}
