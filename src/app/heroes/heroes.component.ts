import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  //styleUrls: ['../bootstrap.min.css'],
  providers: [HeroService]
  
})
export class HeroesComponent {


    constructor(private heroService: HeroService,
                private router : Router){}
  selectedHero;
  value;
  title = 'Tour of Heroes';
  heroes = this.heroService.getHeroes();
  onSelect(zero){
    this.selectedHero=zero;
    this.value=false;
    //this.router.navigate(['/detail',zero.id])

  }
  //hero = 'Windstorm';
  //title = 'app';
  
}
