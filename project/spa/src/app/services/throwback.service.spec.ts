import { TestBed } from '@angular/core/testing';

import { ThrowbackService } from './throwback.service';

describe('ThrowbackService', () => {
  let service: ThrowbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThrowbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
