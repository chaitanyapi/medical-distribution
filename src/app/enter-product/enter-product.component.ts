import { Component, OnInit, EventEmitter } from '@angular/core';
import { Products } from "../product/product";
import { VideoService } from '../video.service';

@Component({
  selector: 'enter-product',
  templateUrl: './enter-product.component.html',
  //styleUrls: ['./enter-product.component.css']
  outputs:['emitHidden']
})
export class EnterProductComponent implements OnInit {

  constructor(private videoService : VideoService) { }
  hidden : boolean;
  public emitHidden = new EventEmitter();
  public newProd = new EventEmitter();
  ngOnInit() {
  }

}
