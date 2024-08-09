package com.assignment.bank_backend.users;

import com.assignment.bank_backend.exception.AuthenticationException;
import com.assignment.bank_backend.exception.EmailAlreadyExistsException;
import com.assignment.bank_backend.login.Login;
import com.assignment.bank_backend.response.LoginResponse;
import com.assignment.bank_backend.services.AuthenticationService;
import com.assignment.bank_backend.services.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(allowedHeaders = "*", exposedHeaders = "Authorization")
@RestController
public class UserController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    private final UserService userService;
    public UserController(UserService userService, JwtService jwtService, AuthenticationService authenticationService)
    {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = Objects.requireNonNull(userService,"Account Service must not be null");
    }
    @PreAuthorize("hasAnyAuthority('admin')")
    @GetMapping("/api/v1/users")
    public ResponseEntity<List<User>> get (@RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "1000") Integer size) {
        return ResponseEntity.ok(userService.findAll(page,size));
    }
    @PreAuthorize("hasAnyAuthority('admin','AccountHolder')")
    @GetMapping("/api/v1/users/profile")
    public ResponseEntity<User> get() {
        String userEmail=  SecurityContextHolder.getContext().getAuthentication().getName();;
        Optional<User> userr =userService.findByEmail(userEmail);
        if (userr.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userr.get());
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

    @PostMapping("/api/v1/users/login")
    public ResponseEntity<?> authenticate(@RequestBody Login login) {
          try{
              User authenticatedUser = authenticationService.authenticate(login);
              String jwtToken = jwtService.generateToken(authenticatedUser, authenticatedUser.getRoles());
              HttpHeaders headers = new HttpHeaders();
              headers.set("Authorization", "Bearer " + jwtToken);

              Map<Object,Object> newMap= new HashMap<Object,Object>();
              newMap.put("message","Login Sucessful");

              return new ResponseEntity<>(newMap,headers,HttpStatus.ACCEPTED);
          }catch (AuthenticationException e){
            return ResponseEntity.notFound().build();

        }
    }
}
