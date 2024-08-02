
package com.assignment.bank_backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import com.jayway.jsonpath.JsonPath;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BankBackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testLoginAndAuthenticatedEndpoint() throws Exception {
		// Login request
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");
	}
	@Order(1)
	@Test
	public void testAddUserPostSuccess() throws Exception {
		// Login request
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		// Perform POST request to add news with authenticated token
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.content("{\"username\":\"unitTest\",\"useremail\":\"unitTest@gmail.com\",\"useraddress\":\"shadbagh\",\"password\":\"unitTest@123\"}")
						.header("Authorization", "Bearer " + authToken))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useremail", Matchers.is("unitTest@gmail.com")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useraddress", Matchers.is("shadbagh")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.createdAt", Matchers.notNullValue()));
	}
	@Order(2)
	@Test
	public void testCreateAccountWithAdminAuthority() throws Exception {
		// Login request
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = loginResult.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		// Create account request payload
		String accountPayload = "{\"accountNumber\":1234,\"description\":\"Savings Account\",\"cnic\":1234567890123,\"mobileNo\":12345678912,\"accountType\":\"Savings\",\"balance\":1000,\"pin\":1234,\"userId\":4,\"status\":\"active\"}";

		// Perform POST request to create account with authenticated token
		mockMvc.perform(post("/api/v1/accounts")
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayload)
						.header("Authorization", "Bearer " + authToken))
				.andDo(print())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.notNullValue()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is("Savings Account")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountType", Matchers.is("Savings")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(1000)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.pin", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(4)));
	}


	@Order(3)
	@Test
	public void testGetAccountsWithAdminAuthority() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = loginResult.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getaccounts")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + authToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)));
	}
	@Order(4)
	@Test
	public void testGetUserssWithAdminAuthority() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = loginResult.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getusers")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + authToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(4)));
	}
	@Order(8)
	@Test
	public void testUpdateAccountsbyAccountnumber() throws Exception
	{
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = loginResult.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");
		String accountPayload = "{\"description\":\"Updated Description\"}";

		mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/updateByAccountNo/{accountNumber}", 1234567890)
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayload)
						.header("Authorization", "Bearer " + authToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.description", Matchers.is("Updated Description")));

	}
	@Order(6)
    @Test
    public void testAccountLogin() throws Exception {
        // Step 1: Obtain an authentication token (Assuming a login endpoint is available for obtaining a token)
        String loginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";

        MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.expiresIn").isNumber())
                .andDo(print())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();
        String authToken = JsonPath.read(responseBody, "$.token");

        // Step 2: Perform the account login request
        String accountLoginPayload = "{\"accountNo\":1234,\"pin\":1234}";

        MvcResult accountLoginResult = mockMvc.perform(post("/api/v1/accountLogin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(accountLoginPayload)
                        .header("Authorization", "Bearer " + authToken))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", Matchers.is("Login success"))) // Adjust according to actual response
                .andExpect(jsonPath("$.status",Matchers.is(true))) // Adjust according to actual response
                .andReturn();
    }
@Order(7)
    @Test
    public void testGetBalance() throws Exception {
        // Step 1: Obtain an authentication token (Assuming a login endpoint is available for obtaining a token)
        String loginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";

        MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.expiresIn").isNumber())
                .andDo(print())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();
        String authToken = JsonPath.read(responseBody, "$.token");


        MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getBalance/{accountNo}", 1234)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.is(1000))) // Replace with the expected balance
                .andReturn();
    }
	@Order(5)
	@Test
	public void testGetAccountsbyAccountnumber() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult loginResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = loginResult.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accountsByAccountNo/{accountNumber}", 1234567890)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + authToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(jsonPath("$.accountId", Matchers.is(1)))
				.andExpect(jsonPath("$.description", Matchers.is("this is student base account")))
				.andExpect(jsonPath("$.accountType", Matchers.is("student account")))
				.andExpect(jsonPath("$.balance", Matchers.is(5000)))
				.andExpect(jsonPath("$.pin", Matchers.notNullValue()))
				.andExpect(jsonPath("$.userId",Matchers.is(2)));
	}
	@Order(10)
	@Test
	public void testUserLoginAndDebit() throws Exception {
		// Admin login to get token
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult result = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");

		// Create a user
		String userPayload = "{\"username\":\"UserTest\",\"useremail\":\"UserTest@gmail.com\",\"useraddress\":\"shadbagh\",\"password\":\"UserTest@123\"}";
		mockMvc.perform(post("/api/v1/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userPayload)
						.header("Authorization", "Bearer " + authToken))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isCreated())  // Change to 201 if that is what your API should return
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useremail", Matchers.is("UserTest@gmail.com")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useraddress", Matchers.is("shadbagh")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.createdAt", Matchers.notNullValue()));
		String accountPayload = "{\"accountNumber\":12345,\"description\":\"Savings Account\",\"cnic\":1234561234561,\"mobileNo\":12345678123,\"accountType\":\"Savings\",\"balance\":1000,\"pin\":12345,\"userId\":4,\"status\":\"active\"}";
		mockMvc.perform(post("/api/v1/accounts")
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayload)
						.header("Authorization", "Bearer " + authToken))
				.andDo(print())
				.andExpect(status().isCreated())  // Change to 201 if that is what your API should return
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.is(4)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(12345)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is("Savings Account")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountType", Matchers.is("Savings")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(1000)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.pin", Matchers.is(12345)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(4)));

		// User login to get role
		String userLoginPayload = "{\"useremail\":\"UserTest@gmail.com\",\"password\":\"UserTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");

		// Get role for the user
		MvcResult getRoleResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getrole/{email}", "UserTest@gmail.com")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is("AccountHolder"))) // Ensure this matches the actual role
				.andReturn();

		// Debit the account
		String debitPayload = "{\"transactionAmount\":500,\"accountIdFrom\":4}";
		MvcResult debitResult = mockMvc.perform(post("/api/v1/debit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(debitPayload)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())  // Change to 200 if that is what your API should return
				.andExpect(jsonPath("$", Matchers.is("Transaction Success")))
				.andReturn();

		// Get the balance of the account
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getBalance/{accountNo}", 12345)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(500))) // Replace with the expected balance after debit
				.andReturn();
	}

	@Order(11)
	@Test
	public void testUserLoginAndCredit() throws Exception {
		// Admin login to get token
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult result = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		String authToken = JsonPath.read(responseBody, "$.token");


		// User login to get role
		String userLoginPayload = "{\"useremail\":\"UserTest@gmail.com\",\"password\":\"UserTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");

		// Get role for the user
		MvcResult getRoleResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getrole/{email}", "UserTest@gmail.com")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is("AccountHolder"))) // Ensure this matches the actual role
				.andReturn();
		String creditPayload = "{\"transactionAmount\":300,\"accountIdFrom\":4,\"accountIdTo\":2}";
		MvcResult creditResult = mockMvc.perform(post("/api/v1/credit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(creditPayload)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(jsonPath("$", Matchers.is("Transaction Success")))

				.andReturn();
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getBalance/{accountNo}", 12345)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(200))) // Replace with the expected balance
				.andReturn();
	}
	@Order(12)
	@Test
	public void testGetBalanceAfterCredit() throws Exception
	{
		String userLoginPayload = "{\"useremail\":\"esha@gmail.com\",\"password\":\"admin123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getBalance/{accountNo}", 1234567891)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(5300))) // Replace with the expected balance
				.andReturn();
	}
	@Order(13)
	@Test
	public void testDepositandThenGetBalance() throws Exception
	{
		String adminLoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult adminResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(adminLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String adminResponseBody = adminResult.getResponse().getContentAsString();
		String adminAuthToken = JsonPath.read(adminResponseBody, "$.token");
		String depositPayload = "{\"transactionAmount\":10000,\"accountIdFrom\":4}";
		MvcResult depositResult = mockMvc.perform(post("/api/v1/deposit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(depositPayload)
						.header("Authorization", "Bearer " + adminAuthToken))
				.andDo(print())
				.andReturn();

		String userLoginPayload = "{\"useremail\":\"UserTest@gmail.com\",\"password\":\"UserTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getBalance/{accountNo}", 12345)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", "Bearer " + userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(10200))) // Replace with the expected balance
				.andReturn();
	}
	@Order(14)
	@Test
	public void testGetTransactions() throws Exception
	{String userLoginPayload = "{\"useremail\":\"UserTest@gmail.com\",\"password\":\"UserTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();
		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/transactionsByAccountId/{accountId}",4)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + userAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)));
	}
	@Order(15)
	@Test
	public void testGetTransactionsOfUserWhogetCredit() throws Exception
	{String userLoginPayload = "{\"useremail\":\"esha@gmail.com\",\"password\":\"admin123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();
		String userResponseBody = userResult.getResponse().getContentAsString();
		String userAuthToken = JsonPath.read(userResponseBody, "$.token");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/transactionsByAccountId/{accountId}",2)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + userAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)));
	}
	@Order(16)
	@Test
	public void testGetAccountIdByAccountNumber() throws Exception{
	String adminLoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
	MvcResult adminResult = mockMvc.perform(post("/api/v1/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(adminLoginPayload))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.token").isNotEmpty())
			.andExpect(jsonPath("$.expiresIn").isNumber())
			.andDo(print())
			.andReturn();

	String adminResponseBody = adminResult.getResponse().getContentAsString();
	String adminAuthToken = JsonPath.read(adminResponseBody, "$.token");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getAccountId/{accountNumber}",1234567890)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + adminAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.is(1)));
	}
	@Order(17)
	@Test
	public void testGetAccountNumberByAccountId() throws Exception{
		String adminLoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult adminResult = mockMvc.perform(post("/api/v1/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(adminLoginPayload))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andExpect(jsonPath("$.expiresIn").isNumber())
				.andDo(print())
				.andReturn();

		String adminResponseBody = adminResult.getResponse().getContentAsString();
		String adminAuthToken = JsonPath.read(adminResponseBody, "$.token");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getAccountNo/{accountNumber}",1)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + adminAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.is(1234567890)));
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accountsByUserId/{UserId}",2)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", "Bearer " + adminAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(1234567890)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.is(1)));


	}
}
