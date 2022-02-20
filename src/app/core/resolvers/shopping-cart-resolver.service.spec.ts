import { TestBed } from '@angular/core/testing';

import { ShoppingCartResolverService } from './shopping-cart-resolver.service';

describe('ShoppingCartResolverService', () => {
  let service: ShoppingCartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
