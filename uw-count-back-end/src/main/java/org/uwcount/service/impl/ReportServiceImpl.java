package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.uwcount.dto.AccountTransactionSummary;
import org.uwcount.dto.PLReportLine;
import org.uwcount.dto.StartDateAndEndDate;
import org.uwcount.entity.AccountEntity;
import org.uwcount.repository.AccountRepository;
import org.uwcount.repository.AccountTransactionRepository;
import org.uwcount.service.ReportService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final AccountTransactionRepository accTxnRepo;
    private final AccountRepository accRepo;

    @Override
    public List<PLReportLine> createProfitAndLoss(StartDateAndEndDate startDateAndEndDate) {
        List<PLReportLine> plReportLineCreated = new ArrayList<>();
        List<AccountTransactionSummary> retrievedAccountTotalAmounts = accTxnRepo.findTotalAmountByAccountBetweenDates(startDateAndEndDate.getStartDate(), startDateAndEndDate.getEndDate());
        retrievedAccountTotalAmounts.forEach(account->{
            AccountEntity accountEntity = accRepo.findByAccountCode(account.getAccountId());
            PLReportLine plReportLine = new PLReportLine();
            plReportLine.setAccName(accountEntity.getName());
            plReportLine.setAccountType(accountEntity.getAccountType().getId());
            plReportLine.setAmount(account.getTotalAmount());
            plReportLineCreated.add(plReportLine);
//            System.out.println("accountEntity.name: 26: " + accountEntity.getName() + accountEntity.getAccountType().getName());

        });
        return plReportLineCreated;
    }
}
