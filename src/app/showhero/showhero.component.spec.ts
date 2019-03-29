import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowheroComponent } from './showhero.component';

describe('ShowheroComponent', () => {
  let component: ShowheroComponent;
  let fixture: ComponentFixture<ShowheroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowheroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
