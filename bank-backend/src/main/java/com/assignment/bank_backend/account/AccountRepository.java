package com.assignment.bank_backend.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    public Optional<Account> findByAccountNumber(Long accountNumber);
    Boolean existsByCnic(Long cnic);
    public Optional<Account> deleteByAccountNumber(Long accountNumber);
}