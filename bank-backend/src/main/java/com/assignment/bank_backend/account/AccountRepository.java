package com.assignment.bank_backend.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(Long accountNumber);
    Optional<Account> findByUserId(Long userId);
    Boolean existsByCnic(Long cnic);
    Optional<Account> findByAccountId(Long accountId);
}

