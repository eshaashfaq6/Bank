package com.assignment.bank_backend.response;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AccountLoginResponse {
    private String message;

    private Boolean status;
    public AccountLoginResponse (String message, Boolean status) {
        this.message = message;
        this.status = status;
    }


}
