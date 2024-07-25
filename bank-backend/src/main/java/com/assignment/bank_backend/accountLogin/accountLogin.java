package com.assignment.bank_backend.accountLogin;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
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
