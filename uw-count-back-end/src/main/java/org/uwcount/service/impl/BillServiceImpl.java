package org.uwcount.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uwcount.dto.*;
import org.uwcount.entity.*;
import org.uwcount.repository.*;
import org.uwcount.service.BillService;
import org.uwcount.util.ScheduleType;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillRepository billRepo;
    private final SupplierRepository supplierRepo;
    private final BillPaymentRepository pmtRepo;
    private final BillPaymentTransactionRepository billPmtTxTepo;
    private final AccountTransactionRepository accTxnRepo;
    private final ModelMapper mapper;

    private Integer accountsPayableId = 3100;
    private Integer discountRecdAccountId = 6100;
    private Integer taxOnPurchasesId = 1300;

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

        // save bill txns in account txn detail
        saved.getTransactionDetails()
                .forEach(billTransaction -> {
                    AccountTransactionEntity accountTransaction = new AccountTransactionEntity();
                    accountTransaction.setAccountId(billTransaction.getAccountId());
                    accountTransaction.setTransactionRef(billTransaction.getId());
                    accountTransaction.setScheduleType(ScheduleType.BILL);
                    accountTransaction.setAmount(billTransaction.getAmount());
                    accTxnRepo.save(accountTransaction);
                    System.out.println("accountTransaction:57: " + accountTransaction);
                });

        // save total, discount, and tax in account txn detail
        AccountTransactionEntity discountTransaction = new AccountTransactionEntity();
        discountTransaction.setAccountId(discountRecdAccountId);
        discountTransaction.setTransactionRef(saved.getId());
        discountTransaction.setScheduleType(ScheduleType.BILL_TOTAL);
        discountTransaction.setAmount(-saved.getDiscount());
        accTxnRepo.save(discountTransaction);

        AccountTransactionEntity taxTransaction = new AccountTransactionEntity();
        taxTransaction.setAccountId(taxOnPurchasesId);
        taxTransaction.setTransactionRef(saved.getId());
        taxTransaction.setScheduleType(ScheduleType.BILL_TOTAL);
        taxTransaction.setAmount(saved.getTax());
        accTxnRepo.save(taxTransaction);

        AccountTransactionEntity totalTransaction = new AccountTransactionEntity();
        totalTransaction.setAccountId(accountsPayableId);
        totalTransaction.setTransactionRef(saved.getId());
        totalTransaction.setScheduleType(ScheduleType.BILL_TOTAL);
        totalTransaction.setAmount(-(saved.getSubTotal()-saved.getDiscount()+saved.getTax()));
        accTxnRepo.save(totalTransaction);

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
        BillEntity entity = billRepo.findById(bill.getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Bill not found: " + bill.getId()));

        Double newBal = entity.getPayableBal() - bill.getPayableBal();
        entity.setPayableBal(newBal);

        BillEntity saved = billRepo.save(entity);

        return mapper.map(saved, Bill.class);
    }

    @Override
    public BillPayment payBills(BillPayment billPayment) {
        Bill payingBill = new Bill();
        List<BillPaymentTransaction> billPaymentTransactions = billPayment.getBillPaymentTransaction();
        billPayment.setBillPaymentTransaction(null);
        BillPaymentEntity saveBillPmt = pmtRepo.save(mapper.map(billPayment, BillPaymentEntity.class));
//        System.out.println("saveBillPmt: 107: " + saveBillPmt);

        List<BillPaymentTransactionEntity> addedBillPaymentTransactions = new ArrayList<>();

        for (var item : billPaymentTransactions) {
            System.out.println("item: 94: " + item);
            BillPaymentTransactionEntity txnEntity = new BillPaymentTransactionEntity();
            txnEntity.setAmountPaying(item.getAmountPaying());
            txnEntity.setBillId(item.getBillId());
            txnEntity.setDiscountApplied(item.getDiscountApplied());
            txnEntity.setBillPayment(saveBillPmt);  // set the reference to the saved BillPaymentEntity

            BillPaymentTransactionEntity savedTxn = billPmtTxTepo.save(txnEntity);

            // update bill balance after saving pmt txn
            payingBill.setId(savedTxn.getBillId());
            payingBill.setPayableBal(item.getAmountPaying() + item.getDiscountApplied());
            this.updateBillBal(payingBill);

            addedBillPaymentTransactions.add(savedTxn);
//            System.out.println("Saved Transaction BillId: " + savedTxn.getBillId());
        }
        // Add pmt bill txns to bill pmt
        saveBillPmt.setBillPaymentTransaction(addedBillPaymentTransactions);

        return mapper.map(saveBillPmt, BillPayment.class);
    }

    private Supplier findSupplierByName(String name) {
        SupplierEntity entity = supplierRepo.findByName(name);
        if (entity == null) {
            throw new EntityNotFoundException("Supplier '" + name + "' not found");
        }
        return mapper.map(entity, Supplier.class);
    }

}
