package com.assignment.bank_backend.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;

    private Long expiresIn;

    public String getToken()
    {
        return token;
    }

}
