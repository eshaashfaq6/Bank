
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

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String responseBody = result.getResponse().getHeader("Authorization");
	}
	@Order(1)
	@Test
	public void testAddUserPostSuccess() throws Exception {
		// Login request
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");

		// Perform POST request to add news with authenticated token
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.content("{\"username\":\"unitTest\",\"useremail\":\"unitTest@gmail.com\",\"useraddress\":\"shadbagh\",\"password\":\"unitTest@123\"}")
						.header("Authorization",  authToken))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useremail", Matchers.is("unitTest@gmail.com")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useraddress", Matchers.is("shadbagh")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.createdAt", Matchers.notNullValue()));

		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.content("{\"username\":\"amna\",\"useremail\":\"amna@gmail.com\",\"useraddress\":\"shadbagh\",\"password\":\"Amna@123\"}")
						.header("Authorization",  authToken))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useremail", Matchers.is("amna@gmail.com")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.useraddress", Matchers.is("shadbagh")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.createdAt", Matchers.notNullValue()));
	}
	@Order(2)
	@Test
	public void testCreateAccountWithAdminAuthority() throws Exception {
		// Login request
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");

		// Create account request payload
		String accountPayload = "{\"accountNumber\":1234,\"description\":\"Savings Account\",\"cnic\":1234567890123,\"mobileNo\":12345678912,\"accountType\":\"Savings\",\"balance\":1000,\"pin\":1234,\"userId\":2,\"status\":\"active\"}";

		// Perform POST request to create account with authenticated token
		mockMvc.perform(post("/api/v1/accounts")
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayload)
						.header("Authorization",authToken))
				.andDo(print())
				.andExpect(status().isCreated())
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.notNullValue()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is("Savings Account")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountType", Matchers.is("Savings")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(1000)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.pin", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(2)));


// Create account request payload
		String accountPayloadd = "{\"accountNumber\":12345,\"description\":\"Savings Account\",\"cnic\":1234567860123,\"mobileNo\":12345678912,\"accountType\":\"Savings\",\"balance\":1000,\"pin\":1234,\"userId\":3,\"status\":\"active\"}";

		// Perform POST request to create account with authenticated token
		mockMvc.perform(post("/api/v1/accounts")
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayloadd)
						.header("Authorization",authToken))
				.andDo(print())
				.andExpect(status().isCreated())
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.notNullValue()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(12345)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is("Savings Account")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountType", Matchers.is("Savings")))
				.andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(1000)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.pin", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(3)));
	}


	@Order(3)
	@Test
	public void testGetAccountsWithAdminAuthority() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", authToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));
	}
	@Order(4)
	@Test
	public void testGetUserssWithAdminAuthority() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();


		String authToken = result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  authToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)));
	}
	@Order(8)
	@Test
	public void testUpdateAccountsbyAccountnumber() throws Exception
	{
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");
		String accountPayload = "{\"description\":\"Updated Description\"}";

		mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/accounts/{accountNumber}", 1234)
						.contentType(MediaType.APPLICATION_JSON)
						.content(accountPayload)
						.header("Authorization", authToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.description", Matchers.is("Updated Description")));

	}
	@Order(6)
    @Test
    public void testAccountLogin() throws Exception {
        // Step 1: Obtain an authentication token (Assuming a login endpoint is available for obtaining a token)
        String loginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";

        MvcResult result = mockMvc.perform(post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginPayload))
                .andExpect(status().isAccepted())
                .andDo(print())
                .andReturn();

		String authToken = result.getResponse().getHeader("Authorization");

        // Step 2: Perform the account login request
        String accountLoginPayload = "{\"accountNo\":1234,\"pin\":1234}";

        MvcResult accountLoginResult = mockMvc.perform(post("/api/v1/accounts/Login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(accountLoginPayload)
                        .header("Authorization", authToken))
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

        MvcResult loginResult = mockMvc.perform(post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginPayload))
                .andExpect(status().isAccepted())
                .andDo(print())
                .andReturn();

        String authToken = loginResult.getResponse().getHeader("Authorization");


        MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/balance")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", authToken))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.is(1000))) // Replace with the expected balance
                .andReturn();
    }
	@Order(5)
	@Test
	public void testGetAccountsbyAccountnumber() throws Exception {

		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";

		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/ByaccountNo/{accountNumber}", 1234)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", authToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(jsonPath("$.accountId", Matchers.is(1)))
				.andExpect(jsonPath("$.description", Matchers.is("Savings Account")))
				.andExpect(jsonPath("$.accountType", Matchers.is("Savings")))
				.andExpect(jsonPath("$.balance", Matchers.is(1000)))
				.andExpect(jsonPath("$.pin", Matchers.notNullValue()))
				.andExpect(jsonPath("$.userId",Matchers.is(2)));
	}
	@Order(10)
	@Test
	public void testUserLoginAndDebit() throws Exception {
		// Admin login to get token
		String loginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(loginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String authToken = result.getResponse().getHeader("Authorization");
		String userLoginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String userAuthToken = userResult.getResponse().getHeader("Authorization");
		// Debit the account
		String debitPayload = "{\"transactionAmount\":500,\"accountIdFrom\":1}";
		MvcResult debitResult = mockMvc.perform(post("/api/v1/transactions/debit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(debitPayload)
						.header("Authorization", userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())  // Change to 200 if that is what your API should return
				.andExpect(jsonPath("$", Matchers.is("Transaction Success")))
				.andReturn();

		// Get the balance of the account
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/balance")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization",  userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.content().string("500"))
				.andReturn();
	}


	@Order(11)
	@Test
	public void testUserLoginAndCredit() throws Exception {
		String userLoginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String userAuthToken = userResult.getResponse().getHeader("Authorization");


		String creditPayload = "{\"transactionAmount\":300,\"accountIdFrom\":1,\"accountIdTo\":2}";
		MvcResult creditResult = mockMvc.perform(post("/api/v1/transactions/credit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(creditPayload)
						.header("Authorization", userAuthToken))
				.andDo(print())
				.andExpect(jsonPath("$", Matchers.is("Transaction Success")))

				.andReturn();
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/balance")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(200))) // Replace with the expected balance
				.andReturn();
	}
	@Order(12)
	@Test
	public void testGetBalanceAfterCredit() throws Exception
	{
		String userLoginPayload = "{\"useremail\":\"amna@gmail.com\",\"password\":\"Amna@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();
		String userAuthToken = userResult.getResponse().getHeader("Authorization");
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/balance")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization", userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(1300))) // Replace with the expected balance
				.andReturn();
	}
	@Order(13)
	@Test
	public void testDepositandThenGetBalance() throws Exception
	{
		String adminLoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult adminResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(adminLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String adminAuthToken = adminResult.getResponse().getHeader("Authorization");
		String depositPayload = "{\"transactionAmount\":10000,\"accountIdFrom\":1234}";
		MvcResult depositResult = mockMvc.perform(post("/api/v1/transactions/deposit")
						.contentType(MediaType.APPLICATION_JSON)
						.content(depositPayload)
						.header("Authorization", adminAuthToken))
				.andDo(print())
				.andReturn();

		String userLoginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String userAuthToken = userResult.getResponse().getHeader("Authorization");
		MvcResult getBalanceResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/balance")
						.contentType(MediaType.APPLICATION_JSON)
						.header("Authorization",  userAuthToken))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.is(10200))) // Replace with the expected balance
				.andReturn();
	}
	@Order(14)
	@Test
	public void testGetTransactions() throws Exception
	{String userLoginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";
		MvcResult userResult = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(userLoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();
		String userAuthToken = userResult.getResponse().getHeader("Authorization");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/profile/transactions")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization", userAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)));
	}

	@Order(16)
	@Test
	public void testGetAccountIdByAccountNumber() throws Exception{
	String adminLoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
	MvcResult adminResult = mockMvc.perform(post("/api/v1/users/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(adminLoginPayload))
			.andExpect(status().isAccepted())
			.andDo(print())
			.andReturn();
		String adminAuthToken = adminResult.getResponse().getHeader("Authorization");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/{accountNumber}/accountId",1234)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  adminAuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.is(1)));
	}
	@Order(17)
	@Test
	public void testGetAccountOfLoginUser() throws Exception{
		String LoginPayload = "{\"useremail\":\"unitTest@gmail.com\",\"password\":\"unitTest@123\"}";
		MvcResult Result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(LoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String AuthToken = Result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/profile/accounts")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  AuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(1234)))
				.andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.is(1)));


	}
	@Order(18)
	@Test
	public void testGetStatus() throws Exception{
		String LoginPayload = "{\"useremail\":\"amna@gmail.com\",\"password\":\"Amna@123\"}";
		MvcResult Result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(LoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String AuthToken = Result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/{AccountNo}/status",1234)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  AuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.is("active")));


	}
	@Order(19)
	@Test
	public void testUpdateStatus() throws Exception{
		String LoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult Result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(LoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String AuthToken = Result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/accounts/{accountNo}/status",1234)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  AuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.status", Matchers.is("Inactive")));


	}
	@Order(20)
	@Test
	public void testGetAccountNumberById() throws Exception{
		String LoginPayload = "{\"useremail\":\"admin@gmail.com\",\"password\":\"admin123\"}";
		MvcResult Result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(LoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();

		String AuthToken = Result.getResponse().getHeader("Authorization");

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/accounts/{accountId}/accountNo",1)
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  AuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.is(1234)));


	}
	@Order(21)
	@Test
	public void testGetDetailsOfLoginedUser() throws Exception{
		String LoginPayload = "{\"useremail\":\"amna@gmail.com\",\"password\":\"Amna@123\"}";
		MvcResult Result = mockMvc.perform(post("/api/v1/users/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(LoginPayload))
				.andExpect(status().isAccepted())
				.andDo(print())
				.andReturn();
		String AuthToken = Result.getResponse().getHeader("Authorization");
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/profile")
						.contentType(MediaType.APPLICATION_JSON_VALUE)
						.header("Authorization",  AuthToken)
				)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(3)));
	}
}
