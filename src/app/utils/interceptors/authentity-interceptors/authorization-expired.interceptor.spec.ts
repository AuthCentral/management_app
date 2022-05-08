import { TestBed } from '@angular/core/testing';

import { AuthorizationExpiredInterceptor } from './authorization-expired.interceptor';

describe('AuthorizationExpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthorizationExpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthorizationExpiredInterceptor = TestBed.inject(AuthorizationExpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
