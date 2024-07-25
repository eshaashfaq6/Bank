package com.assignment.bank_backend.account;

import com.assignment.bank_backend.accountLogin.accountLogin;
import com.assignment.bank_backend.accountUpdate.accountUpdate;
import com.assignment.bank_backend.exception.CnicAlreadyExistsException;
import com.assignment.bank_backend.exception.EmailAlreadyExistsException;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.response.AccountLoginResponse;
import com.assignment.bank_backend.response.LoginResponse;
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
        return accountRepository.save(account);
    }
    public Optional<Account> findById(Long accountId) {
        return accountRepository.findById(accountId);
    }
    public Optional<Account> findByAccountNo(Long accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }
    public Optional<Account> update(Long accountId,Account account) {
        Optional<Account> existing =accountRepository.findById(accountId);
        if (existing.isPresent()) {
            existing.get().setAccountNumber(account.getAccountNumber());
            existing.get().setDescription(account.getDescription());
            existing.get().setCnic(account.getCnic());
            existing.get().setMobileNo(account.getMobileNo());
            existing.get().setAccountType(account.getAccountType());
            existing = Optional.of(accountRepository.save(existing.get()));
        }
        return existing;
    }
    public Optional<Account> updateByAccountNo(Long accountNumber, accountUpdate account) {
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
    public void delete(Long id) {
        accountRepository.deleteById(id);
    }
    public Optional<Account> deleteByAccountNumber(Long accountNumber) {
        Optional<Account> existing =accountRepository.findByAccountNumber(accountNumber);
        if(existing.isPresent())
        {
            accountRepository.delete(existing.get());
        }
        return existing;
    }
    public Long getBalance(Long accountNo) {
        Long accountId = accountRepository.findByAccountNumber(accountNo).get().getAccountId();
        return accountRepository.findById(accountId).get().getBalance();
    }
    public AccountLoginResponse loginAccount(accountLogin accountLogin)    {
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