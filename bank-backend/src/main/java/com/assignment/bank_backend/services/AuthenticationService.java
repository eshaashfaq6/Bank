package com.assignment.bank_backend.services;
import com.assignment.bank_backend.account.Account;
import com.assignment.bank_backend.account.AccountRepository;
import com.assignment.bank_backend.exception.AuthenticationException;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.users.User;
import com.assignment.bank_backend.users.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,AccountRepository accountRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository=accountRepository;
    }

    public User signup(User input) {
        User user = new User();
        user.setUseremail(input.getUseremail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setUsername(input.getUsername());
        user.setCreatedAt(LocalDateTime.now());
        user.setUseraddress(input.getUseraddress());

        user.setRoles(input.getRoles());
        return userRepository.save(user);
    }

    public User authenticate(Login input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUseremail(),
                        input.getPassword()
                )
        );
        User user=userRepository.findByUseremail(input.getUseremail())
                .orElseThrow();
        Long id=user.getUserId();
        Optional<Account> acc=accountRepository.findByUserId(id);
        if(acc.isEmpty()){
            return user;
        }

        if (!"active".equalsIgnoreCase(acc.get().getStatus())) {
            throw new AuthenticationException("User account is not active");
        }

        return user;
    }
}
