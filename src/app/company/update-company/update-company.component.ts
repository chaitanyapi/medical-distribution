import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';

@Component({
  selector: 'update-company',
  templateUrl: './update-company.component.html',
  // styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  showDl: boolean = false;

  public oneRecord;
  public id;
  public COMPANYTYPE;
  public COMPANYNAME;
  public COMPANYADD;
  public COMPANYPHONE;
  public PRIMARYCONTACTNAME;
  public PRIMARYCONTACTNUMBER;
  public SECONDARYCONTACTNAME;
  public SECONDARYCONTACTNUMBER;
  public ACCOUNTANTCONTACTNAME;
  public ACCOUNTANTCONTACTNUMBER;
  public GSTNO;
  public LFNO;
  public COMPDLNO1;
  public COMPDLNO2;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private location : Location,
              private companyService : CompanyService,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.companyService.getRecord(this.id)
        .subscribe(records => {
          this.oneRecord = records;
          this.COMPANYTYPE = this.oneRecord.COMPANYTYPE;
          this.COMPANYNAME = this.oneRecord.COMPANYNAME;
          this.COMPANYADD = this.oneRecord.COMPANYADD;
          this.COMPANYPHONE = this.oneRecord.COMPANYPHONE;
          this.PRIMARYCONTACTNAME = this.oneRecord.PRIMARYCONTACTNAME;
          this.PRIMARYCONTACTNUMBER = this.oneRecord.PRIMARYCONTACTNUMBER;
          this.SECONDARYCONTACTNAME = this.oneRecord.SECONDARYCONTACTNAME;
          this.SECONDARYCONTACTNUMBER = this.oneRecord.SECONDARYCONTACTNUMBER;
          this.ACCOUNTANTCONTACTNAME = this.oneRecord.ACCOUNTANTCONTACTNAME;
          this.ACCOUNTANTCONTACTNUMBER = this.oneRecord.ACCOUNTANTCONTACTNUMBER;
          this.GSTNO = this.oneRecord.GSTNO;
          this.LFNO = this.oneRecord.LFNO;
          this.COMPDLNO1 = this.oneRecord.COMPDLNO1;
          this.COMPDLNO2 = this.oneRecord.COMPDLNO2;

        })
  }

  onSubmit(value : Company){
    
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
    
        this.companyService.updateCustomer(value, this.route.snapshot.params['id'])
          .subscribe(response => {
            this.flashMessage.show("Company details succesfully updated",{cssClass:"alert-success", timeout:3000});
            this.location.back();
          })
        };

  cancel(){
    this.location.back();
  }
  onChange(type : string){
    this.showDl = (type === 'Pharma')? true : false; 
  }
}
