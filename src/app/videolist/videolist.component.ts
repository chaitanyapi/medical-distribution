import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Video } from "../video";

@Component({
  selector: 'videolist',
  templateUrl: './videolist.component.html',
  //styleUrls: ['./videolist.component.css'],
  outputs:['SelectVideo']
})
export class VideolistComponent implements OnInit {

  public SelectVideo = new EventEmitter();
  @Input() video;
  @Input() showList;
  constructor() { }

  ngOnInit() {
  }

  onSelect(vide:Video){
    this.SelectVideo.emit(vide);
  }
}
