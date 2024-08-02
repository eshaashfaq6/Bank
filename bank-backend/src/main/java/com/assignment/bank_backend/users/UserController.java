package com.assignment.bank_backend.users;

import com.assignment.bank_backend.exception.AuthenticationException;
import com.assignment.bank_backend.exception.EmailAlreadyExistsException;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.response.LoginResponse;
import com.assignment.bank_backend.services.AuthenticationService;
import com.assignment.bank_backend.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class UserController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    private final UserService userService;
    public UserController(UserService userService, JwtService jwtService, AuthenticationService authenticationService)
    {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/getusers")
    public ResponseEntity<List<User>> get (@RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return ResponseEntity.ok(userService.findAll(page,size));
    }
    @GetMapping("/api/v1/getrole/{email}")
    public String getrole (@PathVariable("email") String email) {
        String role=userService.getrole(email);
        return role;
    }
@PreAuthorize("hasAnyAuthority('AccountHolder')")
    @GetMapping("/api/v1/getuserId/{email}")
    public Long getUserId (@PathVariable("email") String email) {
        Long userid=userService.getUserID(email);
        return userid;
    }

    @PreAuthorize("hasAnyAuthority('admin','AccountHolder')")
    @GetMapping("/api/v1/getUserByEmail/{userEmail}")
    public ResponseEntity<User> get(@PathVariable("userEmail") String userEmail) {
        Optional<User> userr =userService.findByEmail(userEmail);
        if (userr.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userr.get());
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/getUserByUserId/{userId}")
    public ResponseEntity<User> get(@PathVariable("userId") Long userId) {
        Optional<User> user =userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping("/api/v1/users")
    public ResponseEntity<User> create(@RequestBody User user) {
        try {

            user = userService.create(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }
        catch(EmailAlreadyExistsException e){
            return ResponseEntity.notFound().build();
        }}

    @PreAuthorize("hasAnyAuthority('admin')")
    @DeleteMapping("/api/v1/deleteUserById/{id}")
    public void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody Login login) {
          try{ User authenticatedUser = authenticationService.authenticate(login);

           String jwtToken = jwtService.generateToken(authenticatedUser);
           LoginResponse loginResponse = new LoginResponse();
           loginResponse.setToken(jwtToken);
           loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);}catch (AuthenticationException e){
            return ResponseEntity.notFound().build();

        }
    }
}
