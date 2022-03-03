import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningPedidoComponent } from './warning-pedido.component';

describe('WarningPedidoComponent', () => {
  let component: WarningPedidoComponent;
  let fixture: ComponentFixture<WarningPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
