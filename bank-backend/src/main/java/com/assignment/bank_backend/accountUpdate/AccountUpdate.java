package com.assignment.bank_backend.accountUpdate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountUpdate {
    private Long accountId;
    private Long accountNumber;
    private String description;
    private Long cnic;
    private Long mobileNo;
    private String accountType;
    private Long balance;
    private String status;
    private Long userId;
    private String username;
    private String useremail;
    private String useraddress;
    private String password;
}
