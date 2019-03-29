import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showhero',
  templateUrl: './showhero.component.html',
  //styleUrls: ['../bootstrap.min.css'],
  outputs : [`childEmit`]
})
export class ShowheroComponent implements OnInit {

  public childEmit = new EventEmitter<string>();
  constructor(private route : Router) { }
@Input() tempo;
@Input() show;

justNavigate(){
  
  this.childEmit.emit("true");
//this.route.navigate(['detail',tempo.id]);
}
  ngOnInit() {
  }

}
