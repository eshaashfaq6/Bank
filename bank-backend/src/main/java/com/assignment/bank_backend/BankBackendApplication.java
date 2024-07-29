package com.assignment.bank_backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication()
@OpenAPIDefinition(info=@Info(title = "Bannk APIs",version = "2.0",description = "bannnnk"))
public class BankBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BankBackendApplication.class, args);

			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

			String password = "password123";
			String encodedPassword = passwordEncoder.encode(password);

			System.out.println("Original Password: " + password);
			System.out.println("Encoded Password: " + encodedPassword);

			boolean matches = passwordEncoder.matches(password, encodedPassword);
			System.out.println("Matches: " + matches);

	}

}
