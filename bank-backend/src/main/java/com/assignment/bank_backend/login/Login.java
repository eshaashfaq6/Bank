package com.assignment.bank_backend.login;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {
    @Id
    private String useremail;
    private String password;
}