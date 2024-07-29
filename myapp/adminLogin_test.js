Feature('login');
Scenario('Login with valid credentials', ({ I }) => {
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

});
