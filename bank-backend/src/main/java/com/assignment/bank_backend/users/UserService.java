package com.assignment.bank_backend.users;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.assignment.bank_backend.account.AccountRepository;
import com.assignment.bank_backend.exception.EmailAlreadyExistsException;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder)
    {
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

        return userRepository.save(user);

    }
    public Optional<User> findByEmail(String userEmail) {

        return userRepository.findByUseremail(userEmail);
    }
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

