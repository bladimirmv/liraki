import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContrasenhaComponent } from './show-contrasenha.component';

describe('ShowContrasenhaComponent', () => {
  let component: ShowContrasenhaComponent;
  let fixture: ComponentFixture<ShowContrasenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContrasenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContrasenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
