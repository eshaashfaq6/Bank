package com.assignment.bank_backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication()
@OpenAPIDefinition(info=@Info(title = "Bannk APIs",version = "2.0",description = "bannnnk"))
public class BankBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BankBackendApplication.class, args);



	}

}
