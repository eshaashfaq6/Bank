package com.assignment.bank_backend.account;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;
    private Long accountNumber;
    private String description;
    private Long cnic;
    private Long mobileNo;
    private String accountType;
    private Long balance;
    private Long pin;
    private Long userId;
}