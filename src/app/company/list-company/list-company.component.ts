import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'list-company',
  templateUrl: './list-company.component.html',
  // styleUrls: ['./list-supply.component.css']
  styles:[`table {
                border-collapse: collapse;
                width : 100%
            }

            table, th, td {
                border: 1px solid black;
            }
            `]
})
export class ListCompanyComponent implements OnInit {

  details : Company;
  @Input() resultLength;
  @Input('companyList') 
  companyList : Array<string>;
  constructor(private router : Router,
              private companyService : CompanyService,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
  }

  routeUpdate(idVal : string){
    // this.supplyService.getRecord(idVal)
    //     .subscribe(record => 
    //       this.details = record
    //       // this.router.navigate(['/detail']);
    this.router.navigate(['/updatecompany', idVal]);
  }

  delete(id : string){
    this.companyService.deleteDocument(id).subscribe(response => 
      this.flashMessage.show("Succesfully deleted the Company details" ,{cssClass:"alert-success", timeout:3000}));
      
  }
}
