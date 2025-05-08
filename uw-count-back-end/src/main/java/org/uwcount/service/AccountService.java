package org.uwcount.service;

import org.uwcount.dto.Account;
import org.uwcount.dto.AccountAlternative;

import java.util.List;

public interface AccountService {
    Account addAccount(Account account);
    Account getAccountByCode(Integer code);
    List<Account> getAccountListByName(String name);
    List<Account> getAccountListByType(Integer type);
    List<Account> getAllAccounts();
    Account updateAccount(Account account);
    Boolean deleteAccount(Integer code);

    List<AccountAlternative> getAllAccountsWithTypeName();
}
