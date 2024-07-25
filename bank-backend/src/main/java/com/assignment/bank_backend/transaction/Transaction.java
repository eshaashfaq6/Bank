package com.assignment.bank_backend.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    private LocalDateTime transactionDate;
    private String transactionDescription;
    private Long transactionAmount;
    private String transactionIndicator;
    private Long accountIdFrom;
    private Long accountIdTo;
}
