package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.JnlEntry;
import org.uwcount.entity.AccountTransactionEntity;
import org.uwcount.entity.JnlEntryEntity;
import org.uwcount.entity.JnlTransactionDetailEntity;
import org.uwcount.repository.AccountTransactionRepository;
import org.uwcount.repository.JERepository;
import org.uwcount.repository.JETxnDetailRepository;
import org.uwcount.service.JEService;
import org.uwcount.util.ScheduleType;

@Service
@RequiredArgsConstructor
public class JEServiceImpl implements JEService {

    private final JERepository jeRepository;
//    private final JETxnDetailRepository jeTxnDetailRepository;
    private final AccountTransactionRepository accTxnRepository;
    private final ModelMapper mapper;

    @Override
    public JnlEntry addJE(JnlEntry je) {
        Double netTotal = 0.0;

        JnlEntryEntity jnlEntry = mapper.map(je, JnlEntryEntity.class);

//        jnlEntry.getJnlLines().forEach(line -> {
//        });
        for ( JnlTransactionDetailEntity line : jnlEntry.getJnlLines()) {
            line.setJe(jnlEntry);
            // check debit matches credit
            netTotal+=line.getAmount();
        }

        if (netTotal != 0) {
            return null;
        }

        JnlEntryEntity saved = jeRepository.save(jnlEntry);

        for (JnlTransactionDetailEntity txn: saved.getJnlLines()) {
            AccountTransactionEntity accTxn = new AccountTransactionEntity();
            accTxn.setAccountId(txn.getAccountCode());
            accTxn.setAmount(txn.getAmount());
            accTxn.setDate(saved.getDate());
            accTxn.setScheduleType(ScheduleType.JNL);
            accTxn.setTransactionRef(saved.getId());

            accTxnRepository.save(accTxn);
        }

        return mapper.map(saved, JnlEntry.class);
    }
}
