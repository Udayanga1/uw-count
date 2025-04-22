import { TestBed } from '@angular/core/testing';

import { ModalCreateInvoiceService } from './modal-create-invoice.service';

describe('ModalCreateInvoiceService', () => {
  let service: ModalCreateInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCreateInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
