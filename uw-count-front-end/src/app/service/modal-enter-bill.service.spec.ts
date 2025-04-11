import { TestBed } from '@angular/core/testing';

import { ModalEnterBillService } from './modal-enter-bill.service';

describe('ModalEnterBillService', () => {
  let service: ModalEnterBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEnterBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
