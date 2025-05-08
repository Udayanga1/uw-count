package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.Account;
import org.uwcount.dto.AccountAlternative;
import org.uwcount.entity.AccountEntity;
import org.uwcount.repository.AccountRepository;
import org.uwcount.service.AccountService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    final private AccountRepository repository;
    final private ModelMapper mapper;

    @Override
    public Account addAccount(Account account) {
        AccountEntity accountEntity = repository.save(mapper.map(account, AccountEntity.class));
        return mapper.map(accountEntity, Account.class);
    }

    @Override
    public Account getAccountByCode(Integer code) {
        AccountEntity accountEntity = repository.findByAccountCode(code);
        return mapper.map(accountEntity, Account.class);
    }

    @Override
    public List<Account> getAccountListByName(String name) {
        return List.of();
    }

    @Override
    public List<Account> getAccountListByType(Integer type) {
        return List.of();
    }

    @Override
    public List<Account> getAllAccounts() {
        List<Account> accountList = new ArrayList<>();
        List<AccountEntity> all = repository.findAll();
        all.forEach(accountEntity -> {
            accountList.add(mapper.map(accountEntity, Account.class));
        });
        return accountList;
    }

    @Override
    public Account updateAccount(Account account) {
        return null;
    }

    @Override
    public Boolean deleteAccount(Integer code) {
        return null;
    }

    @Override
    public List<AccountAlternative> getAllAccountsWithTypeName() {
        return repository.findAll().stream()
                .map(e -> mapper.map(e, AccountAlternative.class))
                .collect(Collectors.toList());
    }
}
