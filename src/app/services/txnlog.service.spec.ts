import { TestBed, inject } from '@angular/core/testing';

import { TxnlogService } from './txnlog.service';

describe('TxnlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TxnlogService]
    });
  });

  it('should be created', inject([TxnlogService], (service: TxnlogService) => {
    expect(service).toBeTruthy();
  }));
});
