import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMoralComponent } from './person-moral.component';

describe('PersonMoralComponent', () => {
  let component: PersonMoralComponent;
  let fixture: ComponentFixture<PersonMoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonMoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
