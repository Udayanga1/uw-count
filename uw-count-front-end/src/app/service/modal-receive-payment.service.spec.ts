import { TestBed } from '@angular/core/testing';

import { ModalReceivePaymentService } from './modal-receive-payment.service';

describe('ModalReceivePaymentService', () => {
  let service: ModalReceivePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalReceivePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
