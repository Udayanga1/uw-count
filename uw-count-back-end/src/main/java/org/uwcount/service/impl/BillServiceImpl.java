package org.uwcount.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uwcount.dto.Bill;
import org.uwcount.dto.BillTransaction;
import org.uwcount.dto.Supplier;
import org.uwcount.entity.BillEntity;
import org.uwcount.entity.BillTransactionEntity;
import org.uwcount.entity.SupplierEntity;
import org.uwcount.repository.BillRepository;
import org.uwcount.repository.BillTransactionRepository;
import org.uwcount.repository.SupplierRepository;
import org.uwcount.service.BillService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillRepository billRepo;
    private final SupplierRepository supplierRepo;
    private final BillTransactionRepository txRepo;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public Bill addBill(Bill billDto) {
        billDto.setPayableBal(billDto.getSubTotal() - billDto.getDiscount() + billDto.getTax());
        BillEntity billEntity = mapper.map(billDto, BillEntity.class);

        // Map & attach each transaction
        List<BillTransactionEntity> txEntities = billDto.getBillTransactions()
                .stream()
                .map(txDto -> {
                    BillTransactionEntity txEnt = mapper.map(txDto, BillTransactionEntity.class);
                    txEnt.setBill(billEntity);
                    return txEnt;
                })
                .collect(Collectors.toList());
        billEntity.setTransactionDetails(txEntities);

        BillEntity saved = billRepo.save(billEntity);

        return mapper.map(saved, Bill.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Bill> getAllBills() {
        return billRepo.findAll()
                .stream()
                .map(be -> mapper.map(be, Bill.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Bill> getAllBillsBySupplier(String supplierName) {
        Integer supplierId = findSupplierByName(supplierName).getId();

        List<BillEntity> supplierBills = billRepo.findBySupplierId(supplierId);
        return supplierBills.stream()
                .map(be -> mapper.map(be, Bill.class))
                .collect(Collectors.toList());
    }

    @Override
    public Bill updateBillBal(Bill bill) {
//        billRepo.updateBal(bill.getPayableBal(), bill.getId());
//        return bill;
        BillEntity entity = billRepo.findById(bill.getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Bill not found: " + bill.getId()));

        Double newBal = entity.getPayableBal() - bill.getPayableBal();
        entity.setPayableBal(newBal);

        BillEntity saved = billRepo.save(entity);

        return mapper.map(saved, Bill.class);
    }

    private Supplier findSupplierByName(String name) {
        SupplierEntity entity = supplierRepo.findByName(name);
        if (entity == null) {
            throw new EntityNotFoundException("Supplier '" + name + "' not found");
        }
        return mapper.map(entity, Supplier.class);
    }

}
