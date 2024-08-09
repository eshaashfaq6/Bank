package com.assignment.bank_backend.transaction;

import com.assignment.bank_backend.account.Account;
import com.assignment.bank_backend.account.AccountRepository;
import com.assignment.bank_backend.account.AccountService;
import com.assignment.bank_backend.users.User;
import com.assignment.bank_backend.users.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin
@RestController
public class TransactionController {
    private final TransactionService transactionService;
    private final UserService userService;
    private final AccountService accountService;

    public TransactionController(UserService userService,AccountService accountService,TransactionService transactionService )
    {
        this.transactionService = transactionService;
        this.accountService= Objects.requireNonNull(accountService,"Account Service must not be null");
        this.userService=userService;
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/transactions")
    public ResponseEntity<List<Transaction>> get () {
        return ResponseEntity.ok(transactionService.findAll());
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/accounts/profile/transactions")
    public ResponseEntity<List<Transaction>> getByAccountId() {
        String UserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> u=userService.findByEmail(UserEmail);
        Optional<Account> acc =accountService.findByUserId(u.get().getUserId());
        List<Transaction> transactionr =transactionService.findTransByAccountId(acc.get().getAccountId());
        if (transactionr.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transactionr);
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/transactions/deposit")
    public ResponseEntity<Transaction> deposit(@RequestBody Transaction transaction) {
        Optional<Account> acc=accountService.findByAccountNo(transaction.getAccountIdFrom());
        transaction.setAccountIdFrom(acc.get().getAccountId());
        transaction= transactionService.deposit(transaction);
        return ResponseEntity.created(URI.create("/api/v1/deposit" + transaction.getTransactionId())).body(transaction);
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @PostMapping("/api/v1/transactions/debit")
    public String debit(@RequestBody Transaction transaction) {
        String UserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> u=userService.findByEmail(UserEmail);
        Optional<Account> acc =accountService.findByUserId(u.get().getUserId());
        transaction.setAccountIdFrom(acc.get().getAccountId());
        String message= transactionService.debit(transaction);
        return message;
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @PostMapping("/api/v1/transactions/credit")
    public String credit(@RequestBody Transaction transaction) {
        String UserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> u=userService.findByEmail(UserEmail);
        Optional<Account> acc =accountService.findByUserId(u.get().getUserId());
        transaction.setAccountIdFrom(acc.get().getAccountId());
        String message= transactionService.credit(transaction);
        return message;
    }


}

