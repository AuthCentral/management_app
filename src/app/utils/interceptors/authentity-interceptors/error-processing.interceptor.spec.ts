import { TestBed } from '@angular/core/testing';

import { ErrorProcessingInterceptor } from './error-processing.interceptor';

describe('ErrorProcessingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorProcessingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorProcessingInterceptor = TestBed.inject(ErrorProcessingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
