import { TestBed } from '@angular/core/testing';

import { UserRoutingGuard } from './user-routing.guard';

describe('UserRoutingGuard', () => {
  let guard: UserRoutingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRoutingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
