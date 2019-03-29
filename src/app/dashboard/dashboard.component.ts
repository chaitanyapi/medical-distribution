import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['../bootstrap.min.css']
})
export class DashboardComponent implements OnInit {

    public heroes;
  constructor(private heroService : HeroService,
              private location : Location) { }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes().slice(1,5);
  }

}
