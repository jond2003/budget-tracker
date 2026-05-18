import { TestBed } from '@angular/core/testing';

import { IncomeApiService } from './income-api.service';

describe('IncomeApiService', () => {
  let service: IncomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
