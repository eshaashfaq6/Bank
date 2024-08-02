Feature('User login');
 Scenario('UserLogin And WidthDrwaw Cash', ({ I }) => {
    I.amOnPage('http://localhost:3000'); 
    I.see('User Login');
    I.click('User Login')
    I.amOnPage('http://localhost:3000/userlogin'); 
    I.fillField('Enter Your Email ID', 'Test@example.com');
     I.fillField('Enter Your Password', 'Test@123');
     I.click('Login');
     I.seeInCurrentUrl('/myprofile');
     I.see('My Profile'); 
     I.click('Transaction'); 
     I.amOnPage('http://localhost:3000/accountlogin');
     I.fillField({ id: 'accountNo' }, '1111111111');
     I.fillField({ id: 'confirmPass' }, '1234');     
    I.click('Login');
    
    I.amOnPage('http://localhost:3000/transaction/1111111111');
     I.see('Cash Withdrawl');
     I.click('Cash Withdraw');
     I.amOnPage('http://localhost:3000/debit/1111111111')
     I.fillField({ id: 'amount' }, '2000');
     I.click('//button[text()="Withdraw"]');
     I.amOnPage('http://localhost:3000/balance/1111111111')
     I.see('3000')
 });
 Feature('User login');
 Scenario('UserLogin And Balance Enquiry', ({ I }) => {
    I.amOnPage('http://localhost:3000'); 
    I.see('User Login');
    I.click('User Login')
    I.amOnPage('http://localhost:3000/userlogin'); 
    I.fillField('Enter Your Email ID', 'Test@example.com');
     I.fillField('Enter Your Password', 'Test@123');
     I.click('Login');
     I.seeInCurrentUrl('/myprofile');
     I.see('My Profile'); 
     I.click('Transaction'); 
     I.amOnPage('http://localhost:3000/accountlogin');
     I.fillField({ id: 'accountNo' }, '1111111111');
     I.fillField({ id: 'confirmPass' }, '1234');     
    I.click('Login');
    
    I.amOnPage('http://localhost:3000/transaction/1111111111');
     I.see('Balance Enquiry');
     I.click('Balance Enquiry');
     I.amOnPage('http://localhost:3000/balance/1111111111')
     I.see('3000')
 });
 Feature('User login');
 Scenario('UserLogin And Transfer Money', ({ I }) => {
    I.amOnPage('http://localhost:3000'); 
    I.see('User Login');
    I.click('User Login')
    I.amOnPage('http://localhost:3000/userlogin'); 
    I.fillField('Enter Your Email ID', 'Test@example.com');
     I.fillField('Enter Your Password', 'Test@123');
     I.click('Login');
     I.seeInCurrentUrl('/myprofile');
     I.see('My Profile'); 
     I.click('Transaction'); 
     I.amOnPage('http://localhost:3000/accountlogin');
     I.fillField({ id: 'accountNo' }, '1111111111');
     I.fillField({ id: 'confirmPass' }, '1234');     
    I.click('Login');
    
    I.amOnPage('http://localhost:3000/transaction/1111111111');
     I.see('Transfer');
     I.click('Transfer');
     I.amOnPage('http://localhost:3000/credit/1111111111')
     I.fillField({ id: 'amount' }, '500');
     I.fillField({ id: 'recieverAccountNo' }, '2222222222');  
     I.click('//button[text()="Transfer"]');   
     I.amOnPage('http://localhost:3000/balance/1111111111')
     I.see('2500')
 });