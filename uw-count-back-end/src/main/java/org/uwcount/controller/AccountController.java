package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Account;
import org.uwcount.dto.AccountAlternative;
import org.uwcount.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@CrossOrigin
public class AccountController {
    private final AccountService service;

    @PostMapping("/add")
    public ResponseEntity<Account> add(@RequestBody Account account) {
        Account created = service.addAccount(account);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Account>> getAll() {
        return ResponseEntity.ok(service.getAllAccounts());
    }

    @GetMapping("/get-all-alternative")
    public ResponseEntity<List<AccountAlternative>> getAllWithTypeName() {
        return ResponseEntity.ok(service.getAllAccountsWithTypeName());
    }
}
