import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../customer';
import { CustomerServiceService } from '../customer-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  // styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  public city: string;
  public arr: any;
  public gst: any;
  public id;
  public custname;
  public custadd;
  public custcontact1;
  public custcontact2;
  public apgstno;
  public lfno;
  public dist;
  public rep;
  public rtname;
  public carrier;
  public station;
  public oneRecord : Customers;
  public custName : string;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private location : Location,
              private customerService : CustomerServiceService,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getRecord(this.id)
        .subscribe(records => {
          this.oneRecord = records;
          this.custname = this.oneRecord.CUSTNAME;
          this.custadd = this.oneRecord.CUSTADD;
          this.custcontact1 = this.oneRecord.CUSTCONT1;
          this.custcontact2 = this.oneRecord.CUSTCONT2;
          this.gst = this.oneRecord.GST;
          this.city = this.oneRecord.CITY;
          this.apgstno = this.oneRecord.APGSTNO;
          this.lfno = this.oneRecord.LFNO;
          this.dist = this.oneRecord.DIST;
          this.rep = this.oneRecord.REP;
          this.rtname = this.oneRecord.RTNAME;
          this.carrier = this.oneRecord.CARRIER;
          this.station = this.oneRecord.STATION;
        })
  }

onSubmit(value : Customers){

//Tried to access oneRecord object which was captured in the onInit block above. 
//  successfull at printing the entire object but individual key value pair is not accessable.
//  Hence tried to make entire object into string and then break it down into key value pairs.
//this below command will convert above captured oneRecord to string. we are then capturing in an array and
//comparing the old value with newly submitted value.
    let arr = JSON.stringify(this.oneRecord).replace(/[\"{}]/g,'').split(',');
    arr.forEach(function(vari){
      let newarr=[];
      newarr = vari.split(':');
      Object.keys(value).forEach(function(innervar){
        if(value[innervar] === null || value[innervar] === undefined){
          delete value[innervar];
        } else {
          if(newarr[0] === innervar){
            if(typeof value[innervar] === 'number'){
              newarr[1] = Number(newarr[1]);
            }
            if(newarr[1] === value[innervar]){
              delete value[innervar];
            }
          }      
        }
      })
    });

    this.customerService.updateCustomer(value, this.route.snapshot.params['id'])
      .subscribe(response => {
        this.flashMessage.show("Customer details succesfully updated",{cssClass:"alert-success", timeout:3000});
        this.location.back();
      })
    };
    

  cancel(){
      this.location.back();
    }
}
