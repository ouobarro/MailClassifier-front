import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfosComponent } from './person-infos.component';

describe('PersonInfosComponent', () => {
  let component: PersonInfosComponent;
  let fixture: ComponentFixture<PersonInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
