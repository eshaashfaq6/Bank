package com.assignment.bank_backend.transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
   public Optional<Transaction> findById(Long id);
   public List<Transaction> findByAccountIdFrom(Long accountId);
   public List<Transaction> findByAccountIdTo(Long accountId);
}