package org.uwcount.service;

import org.uwcount.dto.Invoice;

import java.util.List;

public interface InvoiceService {
    Invoice createInvoice(Invoice invoiceDto);
    List<Invoice> getAllInvoices();
}
