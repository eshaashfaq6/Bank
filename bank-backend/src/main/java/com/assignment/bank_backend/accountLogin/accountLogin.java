package com.assignment.bank_backend.accountLogin;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class accountLogin {
    @Id
    private Long accountNo;
    private Long pin;
}
