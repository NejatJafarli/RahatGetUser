import { TestBed } from '@angular/core/testing';

import { TranslateCacheService } from './translate-cache.service';

describe('TranslateCacheService', () => {
  let service: TranslateCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
