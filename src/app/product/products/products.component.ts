import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { Products } from "../product";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FetchImageService } from '../../fetch-image.service';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs/Subject';
// import { Supply } from '../supply';



const states = ['PRODUCTCODE', 'PRODUCTNAME', 'PRODSUPP', 'SUPPNAME', 'suppcode'];


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService]
  //styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  COMPANYCODE: any;
  comps: any;
  img: any;
  productInfo: string;
  fileName: string;
  showPicture : boolean= false;
  resultLength : number = null;
  hidden : boolean = true;
  products : Array<Products> = null;
  image : string;
  respImage;
  searchBy: any;
  private searchTerm = new Subject<string>();
  // posts: Post[] = [];
  // supply : Supply;
    autocompleteBox = {hide: true};




  formatter = (result: string) => result.toUpperCase();

  
  @ViewChild('fieldRef') el:ElementRef;

  constructor(
    private productService : ProductService,
    private flashMessage : FlashMessagesService,
    private fetchImage : FetchImageService,
    // private rd: Renderer2
    private config: NgbTypeaheadConfig
  ) { 
    config.showHint = true;
    // console.log("initiated on constructor");
    // const response$ : Observable<Response> = productService.getCol()
    //     .map((res:Response)=> res.json());
    
    //     response$.subscribe( 
    //   collist => console.log(collist),//this.search = collist,
    //   ()=>{},
    //   ()=> console.log("done")
    // );

    // this.searchTerm.debounceTime(100).distinctUntilChanged().subscribe(searchTerm => {
    //         this.productService.search(searchTerm).subscribe(response => {
    //           this.comps = response;
    //         });
    //       });
  }



  ngOnInit() {

    // console.log(this.states);
  }

  

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(1)
    .distinctUntilChanged()
    .map(term => term === '' ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  searchTxt = (text$: Observable<string>) =>
      text$
        .debounceTime(1)
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

  onSubmit(value : Products){
    value.PRODPIC = this.image;
    value.fileName = this.fileName;
    value["COMPANYCODE"]=this.COMPANYCODE;
    this.productService.addProduct(value)
    .subscribe( newProduct => {   
      this.hidden=true;
      this.flashMessage.show("Product added succesfully to database",{cssClass:"alert-success", timeout:3000});
    })
  }

  fetchData(searchVal, searchBy){
    this.productService.getProducts(searchVal, searchBy)
    .subscribe(resProdData=>{
      this.products = resProdData;
    this.resultLength = this.products.length;
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

  getProduct(event : Object){
    if (event['prod']['PRODPIC']){
      this.fetchImage.getVideos(event['prod']['PRODPIC'])
      .subscribe(
        response => {
          this.respImage = response;
          this.img = this.respImage._body;
        }
      )
      this.productInfo = event['prod']['name'];
      this.showPicture = event['show'];
    } else {
      this.showPicture = false;
    }
  }


  onKeyup(searchText : string){
    this.searchTerm.next(searchText);
    this.searchTerm.debounceTime(100).distinctUntilChanged().subscribe(searchTerm => {
      this.productService.search(searchTerm,"COMPANYNAME","company").subscribe(response => {
        this.comps = response;
      });
    });
  }

  companyDetail(value : string){
    this.productService.getCompanyDetail(value['item'])
                        .subscribe(name => {
                          this.COMPANYCODE = name["COMPANYCODE"]});
  }
}
