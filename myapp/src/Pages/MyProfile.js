import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

function MyProfile() {
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const token = Cookies.get('token');
    
    useEffect(() => {
        const fetchData = async () => {
            const decoded = jwtDecode(token);
            try {
                const userResponse = await axios.get(`http://localhost:8080/api/v1/getUserByEmail/${decoded.sub}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);
                
                const accountResponse = await axios.get(`http://localhost:8080/api/v1/accountsByUserId/${userResponse.data.userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAccount(accountResponse.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };
        
        if (token) fetchData();
    }, [token, user.userId]);

    return (
        <div><br></br>
<br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="container user-details">
                <br></br>
                <h2 className="title">My Profile</h2>
                <div className="form-container">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="id">User ID</label>
                            <input type="text" id="id" value={user.userId || ''} readOnly className="light-blue-bg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={user.uname || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={user.useremail || ''} readOnly className="light-blue-bg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" value={user.useraddress || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Mobile No</label>
                            <input type="text" id="phone" value={account.mobileNo || ''} readOnly className="light-blue-bg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cnic">CNIC</label>
                            <input type="text" id="cnic" value={account.cnic || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="balance">Balance</label>
                            <input type="text" id="balance" value={account.balance || ''} readOnly className="light-blue-bg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountType">Account Type</label>
                            <input type="text" id="accountType" value={account.accountType || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="accountNumber">Account Number</label>
                            <input type="text" id="accountNumber" value={account.accountNumber || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="accountNumber">Account Description</label>
                            <input type="text" id="accountNumber" value={account.description || ''} readOnly className="light-blue-bg" />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br><br></br><br></br>
            <style jsx>{`
                .header-section {
                    padding: 20px 0;
                }
                .light-blue-bg {
                    background-color: #e3f2fd;
                }
                .overlay {
                    position: relative;
                    z-index: 1;
                }
                .header-area {
                    display: flex;
                    align-items: center;
                }
                .navbar {
                    width: 100%;
                }
                .navbar-brand .logo {
                    max-height: 50px;
                }
                .navbar-toggler {
                    border: none;
                    background: transparent;
                }
                .navbar-toggler .fas {
                    font-size: 1.5rem;
                    color: #003366;
                }
                .navbar-nav .nav-link {
                    color: #003366;
                    padding: 0.5rem 1rem;
                    font-weight: 500;
                }
                .navbar-nav .nav-link:hover {
                    color: #0277bd;
                }
                .dropdown-menu {
                    background: #ffffff;
                    border-radius: 0;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .dropdown-menu .nav-link {
                    color: #003366;
                }
                .dropdown-menu .nav-link:hover {
                    color: #0277bd;
                }
                .right-area .cmn-btn {
                    background: #003366;
                    color: #ffffff;
                    padding: 10px 20px;
                    border-radius: 4px;
                    text-decoration: none;
                }
                .right-area .cmn-btn:hover {
                    background: #0277bd;
                }
                .user-details {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .title {
                    text-align: center;
                    color: #003366;
                    font-family: 'Arial', sans-serif;
                    margin-bottom: 20px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                }
                .form-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                }
                .form-group {
                    flex: 1;
                    margin-bottom: 15px;
                }
                .form-group label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: #333;
                }
                .form-group input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    transition: background-color 0.3s, border-color 0.3s;
                }
                .form-group input.light-blue-bg {
                    background-color: #e3f2fd;
                    color: #000;
                }
                .form-group input.light-blue-bg:hover {
                    background-color: #b3e5fc;
                    border-color: #81d4fa;
                }
            `}</style>
        </div>
    );
}

export default MyProfile;
