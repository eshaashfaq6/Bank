Feature('login');
 Scenario('AdminLogin And Add Account', ({ I }) => {
    I.amOnPage('http://localhost:3000/adminlogin'); // Update the URL if different

    I.see('Admin Login');
    
    I.fillField('Enter Your Email ID', 'admin@gmail.com');
     I.fillField('Confirm Password', 'admin123');
    
     I.click('Login');
     // Ensure you are redirected to the /viewaccount page
     I.waitForNavigation({ waitUntil: 'networkidle0' });
     I.seeInCurrentUrl('/myprofile');
     I.see('My Profile'); // Assuming there's text indicating successful navigation
     I.click('Manage User'); // Update selector as needed
     I.click('Add Account'); // Update selector as needed
     I.amOnPage('http://localhost:3000/adduser');
     // Fill in user details
     I.fillField({ id: 'name' }, 'Test');
     I.fillField({ id: 'email' }, 'Test@example.com');
     I.fillField({ id: 'adress' }, '123 Elm Street'); // Ensure the ID matches, consider fixing the typo
     I.fillField({ id: 'confirmPass' }, 'Test@123');

    // Submit the form     
    I.click('Submit Now');
     // Ensure successful redirection to the add account page
     I.waitForNavigation({ waitUntil: 'networkidle0' });
     I.seeInCurrentUrl('/addaccount/');
     I.see('Add Account');

     I.fillField({ id: 'accountNumber' }, '1234567890');
     I.fillField({ id: 'accountDescription' }, 'Savings Account');
     I.fillField({ id: 'CNIC' }, '1214971020123');
     I.fillField({ id: 'mobileNumber' }, '98765432101');
     I.fillField({ id: 'accountType' }, 'Checking');
     I.fillField({ id: 'balance' }, '5000');
    I.fillField({ id: 'pin' }, '1234');
    I.click('Submit Now');
    I.seeInCurrentUrl('http://localhost:3000/viewaccount');
     I.see('Accounts');
 });
 Scenario('AdminLogin And Update Account', ({ I }) => {
     I.amOnPage('http://localhost:3000/adminlogin'); // Update the URL if different

     I.see('Admin Login');
    
     I.fillField('Enter Your Email ID', 'admin@gmail.com');
     I.fillField('Confirm Password', 'admin123');
    
     I.click('Login');
     // Ensure you are redirected to the /viewaccount page
     I.waitForNavigation({ waitUntil: 'networkidle0' });
     I.seeInCurrentUrl('/myprofile');
     I.see('My Profile'); // Assuming there's text indicating successful navigation
     I.click('Manage User'); // Update selector as needed
     I.click('Update Account'); // Update selector as needed
     I.amOnPage('http://localhost:3000/updateaccounthelp');
     // Fill in user details
     I.fillField({ id: 'accountNumber' }, '1234567890');
     // Submit the form
     I.click('//button[text()="Update Account"]');
     I.seeInCurrentUrl('http://localhost:3000/updateAccount/1234567890');

     I.fillField({ id: 'balance' }, '10000');
     I.click('//button[text()="Update Account"]');
     I.seeInCurrentUrl('http://localhost:3000/viewaccount');
     I.see('Accounts');
 });
Scenario('AdminLogin And Deposit', ({ I }) => {
    I.amOnPage('http://localhost:3000/adminlogin'); // Update the URL if different

    I.see('Admin Login');
    
    I.fillField('Enter Your Email ID', 'admin@gmail.com');
    I.fillField('Confirm Password', 'admin123');
    
    I.click('Login');
    // Ensure you are redirected to the /viewaccount page
    I.waitForNavigation({ waitUntil: 'networkidle0' });
    I.seeInCurrentUrl('/myprofile');
    I.see('My Profile'); // Assuming there's text indicating successful navigation
    I.click('Manage User'); // Update selector as needed
    I.click('Deposit'); // Update selector as needed
    I.amOnPage('http://localhost:3000/depos');
    // Fill in user details
    I.fillField({ id: 'accountNo' }, '1234567890');
    // Submit the form
    I.click('//button[text()="Check"]');
    I.amOnPage('http://localhost:3000/deposit/1234567890');
    
    I.fillField({ id: 'amount' }, '5000');
    I.click('//button[text()="Deposit"]');
    I.seeInCurrentUrl('http://localhost:3000/viewaccount');
});
Scenario('AdminLogin And Delete User', ({ I }) => {
    I.amOnPage('http://localhost:3000/adminlogin'); // Update the URL if different

    I.see('Admin Login');
    
    I.fillField('Enter Your Email ID', 'admin@gmail.com');
    I.fillField('Confirm Password', 'admin123');
    
    I.click('Login');
    // Ensure you are redirected to the /viewaccount page
    I.waitForNavigation({ waitUntil: 'networkidle0' });
    I.seeInCurrentUrl('/myprofile');
    I.see('My Profile'); // Assuming there's text indicating successful navigation
    I.click('Manage User'); // Update selector as needed
    I.click('Delete User'); // Update selector as needed
    I.amOnPage('http://localhost:3000/deleteUser');
    // Fill in user details
    I.fillField({ id: 'userId' }, '4');
    // Submit the form
    I.click('//button[text()="Delete User"]');
    I.seeInCurrentUrl('http://localhost:3000/viewuser');
    I.dontSee('Test');
});