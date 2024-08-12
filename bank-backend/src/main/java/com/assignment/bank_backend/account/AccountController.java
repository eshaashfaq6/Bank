package com.assignment.bank_backend.account;

import com.assignment.bank_backend.accountLogin.AccountLogin;
import com.assignment.bank_backend.accountUpdate.AccountUpdate;
import com.assignment.bank_backend.exception.AccountNumberAlreadyExistsException;
import com.assignment.bank_backend.exception.CnicAlreadyExistsException;
import com.assignment.bank_backend.response.AccountLoginResponse;
import com.assignment.bank_backend.users.User;
import com.assignment.bank_backend.users.UserService;
import org.springframework.http.HttpStatus;
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
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;
    public AccountController(AccountService accountService,UserService userService)
    {
        this.userService=userService;
        this.accountService = Objects.requireNonNull(accountService,"Account Service must not be null");
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/accounts")
    public ResponseEntity<List<Account>> get (@RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return ResponseEntity.ok(accountService.findAll(page,size));
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/accounts/ByaccountNo/{accountNumber}")
    public ResponseEntity<Account> getByAccountNo(@PathVariable("accountNumber") Long accountNumber) {
        Optional<Account> acc =accountService.findByAccountNo(accountNumber);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder','admin')")
    @GetMapping("/api/v1/users/profile/accounts")
    public ResponseEntity<Account> getAccountByUserId() {
        String UserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> u=userService.findByEmail(UserEmail);
        Optional<Account> acc =accountService.findByUserId(u.get().getUserId());
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder','admin')")
    @GetMapping("/api/v1/accounts/{accountId}/accountNo")
    public Long getaccountNo(@PathVariable("accountId") Long accountId) {
        Long No =accountService.findAccountNo(accountId);
        return No;
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/accounts")
    public ResponseEntity<?> create(@RequestBody Account account) {
        try {
            account = accountService.create(account);
            return ResponseEntity.created(URI.create("/api/v1/Accounts/" )).body(account);
        } catch (CnicAlreadyExistsException e) {
            return ResponseEntity.notFound().build();
        } catch (AccountNumberAlreadyExistsException e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PatchMapping("/api/v1/accounts/{accountNumber}")
    public ResponseEntity<Account> updateByAccountNumber(@PathVariable("accountNumber") Long accountNumber, @RequestBody AccountUpdate account) {
        Optional<Account> saved = accountService.updateByAccountNo(accountNumber, account);
        if (saved.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saved.get());
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PutMapping("/api/v1/accounts/{accountNo}/status")
    public ResponseEntity<Account> updateStatus(@PathVariable("accountNo") Long accountNo) {
        Optional<Account> acc=accountService.updateStatus(accountNo);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder','admin')")
    @GetMapping("/api/v1/accounts/{accountNumber}/accountId")
    public ResponseEntity<?> getAccountId(@PathVariable("accountNumber") Long accountNumber) {
        Optional<Account> acc =accountService.findByAccountNo(accountNumber);
        if (acc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(acc.get().getAccountId());
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/accounts/balance")
    public Long getbalance() {
        String UserEmail =  SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> u=userService.findByEmail(UserEmail);
        Optional<Account> acc =accountService.findByUserId(u.get().getUserId());

        Long balance=accountService.getBalance(acc.get().getAccountNumber());

        return balance;
    }
    @PreAuthorize("hasAnyAuthority('AccountHolder')")
      @PostMapping("/api/v1/accounts/Login")
      public ResponseEntity<AccountLoginResponse> accountLogin(@RequestBody AccountLogin account) {
      AccountLoginResponse res =accountService.loginAccount(account);
      return ResponseEntity.ok(res);

    }
    @PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/accounts/{AccountNo}/status")
    public String getStatus (@PathVariable Long AccountNo) {
        return accountService.getstatus(AccountNo);
    }
}
