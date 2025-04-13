import { TestBed } from '@angular/core/testing';

import { ModalPayBillService } from './modal-pay-bill.service';

describe('ModalPayBillService', () => {
  let service: ModalPayBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPayBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
