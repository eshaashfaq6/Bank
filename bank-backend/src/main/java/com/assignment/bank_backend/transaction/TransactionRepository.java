package com.assignment.bank_backend.transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("Select t from transactions t ORDER BY t.transactionId DESC")
    List<Transaction> findAlltransac();
    Optional<Transaction> findById(Long id);

    @Query("Select t from transactions t where t.accountIdFrom= :accountId ORDER BY t.transactionId DESC")
    List<Transaction> findByAccountIdFrom(@Param("accountId") Long accountId);
    List<Transaction> findByAccountIdTo(Long accountId);
}