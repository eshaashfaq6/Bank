package com.assignment.bank_backend.transaction;

import com.assignment.bank_backend.account.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class TransactionController {
    private final TransactionService transactionService;
    private final AccountRepository accountRepository;

    public TransactionController(TransactionService transactionService, AccountRepository accountRepository)
    {
        this.transactionService = transactionService;
        this.accountRepository = accountRepository;
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/transactions")
    public ResponseEntity<List<Transaction>> get (@RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return ResponseEntity.ok(transactionService.findAll(page,size));
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/transactionsByAccountId/{accountId}")
    public ResponseEntity<List<Transaction>> getByAccountId(@PathVariable("accountId") Long accountId) {
        List<Transaction> transactionr =transactionService.findTransByAccountId(accountId);
        if (transactionr.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transactionr);
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/deposit")
    public ResponseEntity<Transaction> deposit(@RequestBody Transaction transaction) {
        transaction= transactionService.deposit(transaction);
        return ResponseEntity.created(URI.create("/api/v1/deposit" + transaction.getTransactionId())).body(transaction);
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @PostMapping("/api/v1/debit")
    public String debit(@RequestBody Transaction transaction) {
        String message= transactionService.debit(transaction);
        return message;
    }

    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @PostMapping("/api/v1/credit")
    public String credit(@RequestBody Transaction transaction) {
        String message= transactionService.credit(transaction);
        return message;
    }


}

