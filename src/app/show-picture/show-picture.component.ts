import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-picture',
  templateUrl: './show-picture.component.html',
  styleUrls: ['./show-picture.component.css']
})
export class ShowPictureComponent implements OnInit {

  @Input() picture;
  @Input() image;
  
  constructor() { }

  ngOnInit() {
  }

  
}
