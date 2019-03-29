import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import 'rxjs/add/operator/switchMap';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  //styleUrls: ['../bootstrap.min.css'],
  animations: [
    trigger('selected',[
      transition(':enter',[
        style({transform : 'translateX(-100%)'}),
        animate('1s')
      ]),
      transition(':leave',[
        animate('1s', style({transform : 'translateX(100%)'}))
      ])
    ])
  ]
})
export class HeroDetailComponent implements OnInit {
public Id;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) { }
  @Input() show;//: Hero;
  @Input() tempo;
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    //let id = this.route.snapshot.params['id'];
    //this.Id = this.tempo.id;
    
    //this.route.paramMap
    //.switchMap((params: ParamMap) => this.heroService.getHeroes(+params.get('id')))
    //.subscribe(hero => this.hero = hero);
  }

}
