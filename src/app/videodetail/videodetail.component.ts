import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'videodetail',
  templateUrl: './videodetail.component.html',
  //styleUrls: ['./videodetail.component.css']
  outputs: ['updatedVideo']
})
export class VideodetailComponent implements OnInit {

  private updatedVideo = new EventEmitter();
  @Input() video;
  constructor() { }

  ngOnInit() {
  }

  updateVideo(){
    this.updatedVideo.emit(this.video);
  }
}
