import { TestBed } from '@angular/core/testing';

import { RolInterceptor } from './rol.interceptor';

describe('RolInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RolInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RolInterceptor = TestBed.inject(RolInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
