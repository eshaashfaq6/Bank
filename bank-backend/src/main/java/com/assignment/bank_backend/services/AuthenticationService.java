package com.assignment.bank_backend.services;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.users.User;
import com.assignment.bank_backend.users.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

        return userRepository.findByUseremail(input.getUseremail())
                .orElseThrow();
    }
}
