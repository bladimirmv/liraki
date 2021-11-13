import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComentarioComponent } from './new-comentario.component';

describe('NewComentarioComponent', () => {
  let component: NewComentarioComponent;
  let fixture: ComponentFixture<NewComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
