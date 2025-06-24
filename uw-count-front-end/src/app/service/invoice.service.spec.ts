import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';

describe('ModalCreateInvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
