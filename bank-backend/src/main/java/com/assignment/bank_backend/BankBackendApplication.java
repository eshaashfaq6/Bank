package com.assignment.bank_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication()
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
