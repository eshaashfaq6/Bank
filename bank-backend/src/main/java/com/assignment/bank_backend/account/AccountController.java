package com.assignment.bank_backend.account;

import com.assignment.bank_backend.accountLogin.accountLogin;
import com.assignment.bank_backend.accountUpdate.accountUpdate;
import com.assignment.bank_backend.exception.CnicAlreadyExistsException;
import com.assignment.bank_backend.response.AccountLoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class AccountController {

    private final AccountService accountService;
    public AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/getaccounts")
    public ResponseEntity<List<Account>> get (@RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return ResponseEntity.ok(accountService.findAll(page,size));
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/accounts/{accountId}")
    public ResponseEntity<Account> get(@PathVariable("accountId") Long accountId) {
        Optional<Account> acc =accountService.findById(accountId);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/accountsByAccountNo/{accountNumber}")
    public ResponseEntity<Account> getByAccountNo(@PathVariable("accountNumber") Long accountNumber) {
        Optional<Account> acc =accountService.findByAccountNo(accountNumber);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('admin','AccountHolder')")
    @GetMapping("/api/v1/accountsByUserId/{UserId}")
    public ResponseEntity<Account> getccountsByUserId(@PathVariable("UserId") Long UserId) {
        Optional<Account> acc =accountService.findByUserId(UserId);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder','admin')")
    @GetMapping("/api/v1/getAccountNo/{accountId}")
    public Long getaccountNo(@PathVariable("accountId") Long accountId) {
        Long No =accountService.findAccountNo(accountId);
        return No;
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/accounts")
    public ResponseEntity<Account> create(@RequestBody Account account) {
       try {
           account = accountService.create(account);
           return ResponseEntity.created(URI.create("/api/v1/Accounts/" + account.getAccountId())).body(account);
       } catch(CnicAlreadyExistsException e){
           return ResponseEntity.notFound().build();
       }
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PatchMapping("/api/v1/updateByAccountNo/{accountNumber}")
    public ResponseEntity<Account> updateByAccountNumber(@PathVariable("accountNumber") Long accountNumber, @RequestBody accountUpdate account) {
        Optional<Account> saved = accountService.updateByAccountNo(accountNumber, account);
        if (saved.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saved.get());
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/setstatus/{accountNo}")
    public ResponseEntity<Account> setStatus(@PathVariable("accountNo") Long accountNo) {
        Optional<Account> acc=accountService.setStatus(accountNo);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder','admin')")
    @GetMapping("/api/v1/getAccountId/{accountNumber}")
    public ResponseEntity<?> getAccountId(@PathVariable("accountNumber") Long accountNumber) {
        Optional<Account> acc =accountService.findByAccountNo(accountNumber);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get().getAccountId());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/getBalance/{accountNo}")
    public Long getbalance(@PathVariable("accountNo") Long accountNo) {
        Long balance=accountService.getBalance(accountNo);

        return balance;
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder')")
      @PostMapping("/api/v1/accountLogin")
      public ResponseEntity<AccountLoginResponse> accountLogin(@RequestBody accountLogin account) {
      AccountLoginResponse res =accountService.loginAccount(account);
      return ResponseEntity.ok(res);

    }

}
