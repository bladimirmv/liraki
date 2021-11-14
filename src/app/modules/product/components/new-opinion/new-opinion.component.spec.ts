import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOpinionComponent } from './new-opinion.component';

describe('NewOpinionComponent', () => {
  let component: NewOpinionComponent;
  let fixture: ComponentFixture<NewOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
