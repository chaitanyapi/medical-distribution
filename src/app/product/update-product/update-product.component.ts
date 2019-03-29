import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../product';
import { ProductService } from '../product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FetchImageService } from '../../fetch-image.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  // styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  file: any;
  img: any;
  respImage;
  showPicture: boolean = false;
  resultLength: any;
  products: any;
  fileName: string;
  image: any;
  comps: any;

  public oneRecord;
  public id;
  public COMPANYCODE;
  public COMPANYNAME;
  public PRODCODE;
  public PRODNAME;
  public PRODPIC;
  public PRODPACK;
  public CQTY;
  public BPAK;
  public TAX;
  public SRATE;
  public RATE;
  public PRATE;
  public MRP;
  public OFPN;
  public PEDT;
  private searchTerm = new Subject<string>();
  autocompleteBox = {hide: true};
  
  formatter = (result: string) => result.toUpperCase();
  @ViewChild('fieldRef') el:ElementRef;
  
  constructor(private route : ActivatedRoute,
              private router : Router,
              private location : Location,
              private productService : ProductService,
              private fetchImage : FetchImageService,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getRecord(this.id)
        .subscribe(records => {
          this.oneRecord = records;
          this.COMPANYCODE = this.oneRecord.COMPANYCODE;
          this.COMPANYNAME = this.oneRecord.COMPANYNAME;
          this.PRODCODE = this.oneRecord.PRODCODE;
          this.PRODNAME = this.oneRecord.PRODNAME;
          this.PRODPIC = this.oneRecord.PRODPIC;
          this.PRODPACK = this.oneRecord.PRODPACK;
          this.CQTY = this.oneRecord.CQTY;
          this.BPAK = this.oneRecord.BPAK;
          this.TAX = this.oneRecord.TAX;
          this.SRATE = this.oneRecord.SRATE;
          this.RATE = this.oneRecord.RATE;
          this.PRATE = this.oneRecord.PRATE;
          this.MRP = this.oneRecord.MRP;
          this.OFPN = this.oneRecord.OFPN;
          this.PEDT = this.oneRecord.PEDT;
          this.file = this.oneRecord.fileName;
          if (this.PRODPIC){
            this.fetchImage.getVideos(this.PRODPIC)
            .subscribe(
              image => {
                this.respImage = image;
                this.img = this.respImage._body;
              }
            )
            // this.productInfo = event['prod']['name'];
            this.showPicture = true;
          } else {
            this.showPicture = false;
          }
        })
  }

  searchTxt = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term === '' ? []
      : this.comps);//.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  changeListener(){
    var file:File = this.el.nativeElement.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.fileName = file.name;
    }
    myReader.readAsDataURL(file);
  }
  
  // fetchData(searchVal, searchBy){
  //   this.productService.getProducts(searchVal, searchBy)
  //   .subscribe(resProdData=>{
  //     this.products = resProdData;
  //   this.resultLength = this.products.length;
  //   this.showPicture = false;
  // });
  // }
  
  onSubmit(value : Products){
    value.PRODPIC = this.image;
    value.fileName = this.fileName;
    
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

    this.productService.updateCustomer(value, this.route.snapshot.params['id'])
      .subscribe(response => {
        this.flashMessage.show("Product details succesfully updated",{cssClass:"alert-success", timeout:3000});
        this.location.back();
      })
  };

  cancel(){
    this.location.back();
  }

  onKeyup(searchText : string){
    this.searchTerm.next(searchText);
    this.searchTerm.debounceTime(100).distinctUntilChanged().subscribe(searchTerm => {
      this.productService.search(searchTerm,"COMPANYNAME","company").subscribe(response => {
        this.comps = response;
      });
    });
  }

  productDetail(value : string){
    this.productService.getProductDetail(value)
                        .subscribe(name => {
                          this.COMPANYCODE = name["COMPCODE"]});
  }
  
  getProduct(event : Object){

  }
}
