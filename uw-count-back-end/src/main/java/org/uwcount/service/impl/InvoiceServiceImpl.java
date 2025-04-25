package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uwcount.dto.Invoice;
import org.uwcount.entity.InvoiceEntity;
import org.uwcount.repository.InvoiceLineRepository;
import org.uwcount.repository.InvoiceRepository;
import org.uwcount.service.InvoiceService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepo;
    private final InvoiceLineRepository lineRepo;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public Invoice createInvoice(Invoice dto) {
        InvoiceEntity inv = mapper.map(dto, InvoiceEntity.class);
        // Link child entities
        inv.getInvoiceLines().forEach(line -> line.setInvoice(inv));
        // Save graph
        InvoiceEntity saved = invoiceRepo.save(inv);
        return mapper.map(saved, Invoice.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Invoice> getAllInvoices() {
        return invoiceRepo.findAll()
                .stream()
                .map(e -> mapper.map(e, Invoice.class))
                .collect(Collectors.toList());
    }
}
