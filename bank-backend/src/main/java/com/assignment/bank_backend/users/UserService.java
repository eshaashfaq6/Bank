package com.assignment.bank_backend.users;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.assignment.bank_backend.exception.EmailAlreadyExistsException;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.response.LoginResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public List<User> findAll(Integer page, Integer size) {
        if (page < 0) {
            page = 0;
        }
        if (size > 1000) {
            size = 1000;
        }
        return userRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    public User create(User user) {
        if (userRepository.existsByUseremail(user.getUseremail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + user.getUseremail());
        }
        user.setUsername(user.getuname());
        user.setUserId(System.currentTimeMillis());
        user.setCreatedAt(LocalDateTime.now());
        user.setRoles("AccountHolder");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getuname());
        return userRepository.save(user);

    }
    public Optional<User> findById(Long userId) {

        return userRepository.findById(userId);
    }
    public String getrole(String email) {
        Optional<User> user = userRepository.findByUseremail(email);
        if (user.isPresent()) {
            return user.get().getRoles();
        }
        return null;
    }


    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> update(Long userId,User user) {
        Optional<User> existing =userRepository.findById(userId);
        if (existing.isPresent()) {
            existing.get().setUsername(user.getUsername());
            existing.get().setPassword(user.getPassword());
            existing.get().setRoles(user.getRoles());

            existing = Optional.of(userRepository.save(existing.get()));
        }
        return existing;
    }
/*
    public LoginResponse loginUser(Login login)    {
        Optional<User> user1 = userRepository.findByUseremail(login.getUseremail());
        if(user1.isPresent())
        {
            String password = user1.get().getPassword();
            System.out.println(password);
            System.out.println(login.getPassword());
            if (password.startsWith("{noop}")) {
                password = password.substring("{noop}".length()); // Remove {noop} prefix
            }
            if (login.getPassword().equals(password)) {
                    return new LoginResponse("login success",true);
            }
            else {
                return new LoginResponse("password Not match",false);
            }
        }
        else {
            return new LoginResponse("Email not exists",false);
        }
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {

            throw new UsernameNotFoundException("User or passowrd incorrect.");
        }
        return new org.springframework.security.core.userdetails.User(user.get().getUsername(),
                user.get().getPassword(), AuthorityUtils.commaSeparatedStringToAuthorityList(user.get().getRoles()));
    }
}

