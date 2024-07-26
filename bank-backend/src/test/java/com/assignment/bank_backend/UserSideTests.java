package com.assignment.bank_backend;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import com.jayway.jsonpath.JsonPath;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class UserSideTests {

    @Autowired
    private MockMvc mockMvc;
    @Test
    public void testUserLoginAndGetRole() throws Exception {
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
        String userPayload = "{\"username\":\"esha\",\"useremail\":\"esha@gmail.com\",\"useraddress\":\"shadbagh\",\"password\":\"Esha@123\"}";
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(userPayload)
                        .header("Authorization", "Bearer " + authToken))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$.useremail", Matchers.is("esha@gmail.com")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.useraddress", Matchers.is("shadbagh")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.createdAt", Matchers.notNullValue()));

        // Create an account
        String accountPayload = "{\"accountNumber\":1234,\"description\":\"Savings Account\",\"cnic\":1234567890,\"mobileNo\":1234,\"accountType\":\"Savings\",\"balance\":1000,\"pin\":1234,\"userId\":1}";
        mockMvc.perform(post("/api/v1/accounts")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(accountPayload)
                        .header("Authorization", "Bearer " + authToken))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", Matchers.is(1234)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.is("Savings Account")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.cnic", Matchers.is(1234567890)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.mobileNo", Matchers.is(1234)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountType", Matchers.is("Savings")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance", Matchers.is(1000)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.pin", Matchers.is(1234)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId", Matchers.is(1)));

        // User login to get role
        String userLoginPayload = "{\"useremail\":\"esha@gmail.com\",\"password\":\"Esha@123\"}";
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
        MvcResult getRoleResult = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getrole/{email}", "esha@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + userAuthToken))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.is("AccountHolder"))) // Ensure this matches the actual role
                .andReturn();


        String depositPayload = "{\"transactionAmount\":5000,\"accountIdFrom\":2}";
        MvcResult depositResult = mockMvc.perform(post("/api/v1/deposit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(depositPayload)
                        .header("Authorization", "Bearer " + userAuthToken))
                .andDo(print())
                .andExpect(jsonPath("$.transactionDescription", Matchers.is("Deposit Transaction")))
                .andExpect(jsonPath("$.transactionAmount", Matchers.is(5000)))
                .andExpect(jsonPath("$.transactionIndicator", Matchers.is("DP")))
                .andExpect(jsonPath("$.accountIdFrom", Matchers.is(2)))
                .andReturn();

        String debitPayload = "{\"transactionAmount\":5000,\"accountIdFrom\":2}";
        MvcResult debitResult = mockMvc.perform(post("/api/v1/debit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(debitPayload)
                        .header("Authorization", "Bearer " + userAuthToken))
                .andDo(print())
                .andExpect(jsonPath("$", Matchers.is("Transaction Success")))

                .andReturn();

        String de = depositResult.getResponse().getContentAsString();
        System.out.println("Deposit Response: " + de);
    }

}

