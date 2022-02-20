import { TestBed } from '@angular/core/testing';

import { CarritoProyectoService } from './carrito-proyecto.service';

describe('CarritoProyectoService', () => {
  let service: CarritoProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
