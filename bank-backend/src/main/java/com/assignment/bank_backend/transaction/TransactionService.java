package com.assignment.bank_backend.transaction;

import com.assignment.bank_backend.account.Account;
import com.assignment.bank_backend.account.AccountRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class  TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public List<Transaction> findAll(Integer page, Integer size) {
        if (page < 0) {
            page = 0;
        }
        if (size > 1000) {
            size = 1000;
        }
        return transactionRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    public Optional<Transaction> findById(Long transactionId) {
        return transactionRepository.findById(transactionId);
    }
    public List<Transaction> findTransByAccountId(Long accountId) {
        List<Transaction> result=transactionRepository.findByAccountIdFrom(accountId);
        result.addAll(transactionRepository.findByAccountIdTo(accountId));
        return result;
    }
    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }

    public Optional<Transaction> update(Long transactionId,Transaction transaction) {
        Optional<Transaction> existing =transactionRepository.findById(transactionId);
        if (existing.isPresent()) {
            existing.get().setTransactionDate(transaction.getTransactionDate());
            existing.get().setTransactionDescription(transaction.getTransactionDescription());
            existing.get().setTransactionAmount(transaction.getTransactionAmount());
            existing.get().setTransactionIndicator(transaction.getTransactionIndicator());
            existing = Optional.of(transactionRepository.save(existing.get()));
        }
        return existing;
    }
    public Transaction deposit(Transaction transaction) {
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setTransactionIndicator("DP");
        transaction.setTransactionDescription("Deposit Transaction");
        Long accId=transaction.getAccountIdFrom();
        Account account=accountRepository.findById(accId).get();
        Long balance=account.getBalance();
        System.out.println(balance);
        account.setBalance(balance+transaction.getTransactionAmount());
        accountRepository.save(account);
        return transactionRepository.save(transaction);
    }

    public String debit(Transaction transaction) {
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setTransactionIndicator("DB");
        transaction.setTransactionDescription("Debit Transaction");
        Long accId=transaction.getAccountIdFrom();
        Account account=accountRepository.findById(accId).get();
        Long balance=account.getBalance();
        System.out.println(balance);
        if(balance<transaction.getTransactionAmount()) {
            return "Insufficient balance";
        }
        account.setBalance(balance-transaction.getTransactionAmount());
        accountRepository.save(account);
        transactionRepository.save(transaction);
        return "Transaction Success";
    }
    public String credit(Transaction transaction) {
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setTransactionIndicator("DB");
        transaction.setTransactionDescription("Debit Transaction");
        Long accId=transaction.getAccountIdFrom();
        Account account=accountRepository.findById(accId).get();
        Long balance=account.getBalance();
        if(balance<transaction.getTransactionAmount()) {
            return "Insufficient balance";
        }
        account.setBalance(balance-transaction.getTransactionAmount());
        accountRepository.save(account);
        transactionRepository.save(transaction);

        Transaction trans=new Transaction();
        trans.setTransactionDate(LocalDateTime.now());
        trans.setTransactionIndicator("CR");
        trans.setAccountIdFrom(transaction.getAccountIdFrom());
        trans.setTransactionAmount(transaction.getTransactionAmount());
        trans.setTransactionDescription("Credit Transaction");
        transactionRepository.save(trans);
        Long accIdTo=transaction.getAccountIdTo();
        Account recieverAccount=accountRepository.findById(accIdTo).get();
        Long recieverBalance=recieverAccount.getBalance();
        recieverAccount.setBalance(recieverBalance+transaction.getTransactionAmount());
        accountRepository.save(recieverAccount);
        return "Transaction Success";
    }

}
