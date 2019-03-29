import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { Company } from "../company";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FetchImageService } from '../../fetch-image.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { DomSanitizer } from '@angular/platform-browser';
import { CompanyService } from '../company.service';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

const states = ['COMPANYTYPE', 'COMPANYNAME', 'PRIMARYCONTACTNUMBER', 'SECONDARYCONTACTNUMBER', 'GSTNO'];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  // styleUrls: ['./supply.component.css']

})
export class CompanyComponent implements OnInit {

  img: any;
  productInfo: string;
  showDl : boolean = false;
  fileName: string;
  showPicture : boolean= false;
  resultLength : number = null;
  hidden : boolean = true;
  companies : Array<Company> = null;
  image : string;
  respImage;
  searchBy: any;

  formatter = (result: string) => result.toUpperCase();
  
    
  // @ViewChild('fieldRef') el:ElementRef;

  constructor(
    private companyService : CompanyService,
    private flashMessage : FlashMessagesService,
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

  onSubmit(value : Company){
    // value.PRODPIC = this.image;
    // value.fileName = this.fileName;
    this.companyService.addCompany(value)
    .subscribe( newCustomer => {   
      this.hidden=true;
      this.flashMessage.show("Company added succesfully to database",{cssClass:"alert-success", timeout:3000});
    })
  }

  fetchData(search, searchBy){
    this.companyService.getCompany(search, searchBy)
    .subscribe(resProdData=>{
      this.companies = resProdData;
    this.resultLength = this.companies.length;
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

  onChange(type : string){
    this.showDl = (type === 'Pharma')? true : false; 
  }
}
