package com.assignment.bank_backend.account;

import com.assignment.bank_backend.accountLogin.AccountLogin;
import com.assignment.bank_backend.accountUpdate.AccountUpdate;
import com.assignment.bank_backend.exception.AccountNumberAlreadyExistsException;
import com.assignment.bank_backend.exception.CnicAlreadyExistsException;
import com.assignment.bank_backend.response.AccountLoginResponse;
import com.assignment.bank_backend.users.User;
import com.assignment.bank_backend.users.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Account> findAll(Integer page, Integer size) {
        if (page < 0) {
            page = 0;
        }
        if (size > 1000) {
            size = 1000;
        }
        return accountRepository.findAll(PageRequest.of(page, size)).getContent();
    }
    public Account create(Account account) {
        if (accountRepository.existsByCnic(account.getCnic())) {
            throw new CnicAlreadyExistsException("Cnic already exists: " + account.getCnic());
        }
        if(accountRepository.existsByaccountNumber(account.getAccountNumber()))
        {
            throw new AccountNumberAlreadyExistsException("AccountNumber already exists: " + account.getCnic());

        }
        return accountRepository.save(account);
    }
    public Optional<Account> findById(Long accountId) {
        return accountRepository.findById(accountId);
    }
    public Optional<Account> findByAccountNo(Long accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }
    public Optional<Account> findByUserId(Long UserId) {
        return accountRepository.findByUserId(UserId);
    }
    public Optional<Account> updateByAccountNo(Long accountNumber, AccountUpdate account) {
        Optional<Account> existing =accountRepository.findByAccountNumber(accountNumber);
        if (existing.isPresent()) {
            Long userId = existing.get().getUserId();

            if (userId != null) {
                Optional<User> userOptional = userRepository.findById(userId);

                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    if (account.getUseraddress() != null && !account.getUseraddress().isEmpty()) {
                        user.setUseraddress(account.getUseraddress());
                    }
                    if (account.getUseremail() != null && !account.getUseremail().isEmpty()) {
                        user.setUseremail(account.getUseremail());
                    } if (account.getUsername() != null && !account.getUsername().isEmpty()) {
                        user.setUsername(account.getUsername());
                    }
                    if (account.getPassword() != null && !account.getPassword().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(account.getPassword()));
                    }
                    userRepository.save(user);
                }}
            if (account.getAccountNumber() != null) {
                existing.get().setAccountNumber(account.getAccountNumber());
            }
            if (account.getDescription() != null && !account.getDescription().isEmpty()) {
                existing.get().setDescription(account.getDescription());
            }
            if (account.getStatus() != null && !account.getStatus().isEmpty()) {
                existing.get().setStatus(account.getStatus());
            }
            if (account.getCnic() != null) {
                existing.get().setCnic(account.getCnic());
            }
            if (account.getMobileNo() != null) {
                existing.get().setMobileNo(account.getMobileNo());
            }
            if (account.getAccountType() != null && !account.getAccountType().isEmpty()) {
                existing.get().setAccountType(account.getAccountType());

            }
            if (account.getBalance() != null) {
                existing.get().setBalance(account.getBalance());
            }
            existing = Optional.of(accountRepository.save(existing.get()));
        }
        return existing;
    }
    public Long findAccountNo(Long accountId) {
        Optional<Account> acc=accountRepository.findByAccountId(accountId);
        return acc.get().getAccountNumber();
    }
    public Optional<Account> setStatus(Long accountNumber) {
        Optional<Account> existing =accountRepository.findByAccountNumber(accountNumber);
        if(existing.isPresent())
        {
            existing.get().setStatus("Inactive");
            accountRepository.save(existing.get());
        }
        return existing;
    }
    public Long getBalance(Long accountNo) {
        Long accountId = accountRepository.findByAccountNumber(accountNo).get().getAccountId();
        return accountRepository.findById(accountId).get().getBalance();
    }
    public String getstatus(Long accountNo) {
        String status = accountRepository.findByAccountNumber(accountNo).get().getStatus();
        return status;
    }
    public AccountLoginResponse loginAccount(AccountLogin accountLogin)    {
        Optional<Account> acc= accountRepository.findByAccountNumber(accountLogin.getAccountNo());

        if(acc.isPresent())
        {
            Long pin = acc.get().getPin();

            if (accountLogin.getPin().equals(pin)) {
                return new AccountLoginResponse("Login success",true);
            }
            else {
                return new AccountLoginResponse("Pin Not match",false);
            }
        }
        else {
            return new AccountLoginResponse("Account No not exists",false);
        }
    }
}
