import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewAccounts = () => {
  const navigate = useNavigate();

  // Dark blue theme styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
  };

  const tableStyle = {
    width: '80%', // Adjust width as needed
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: 'lightblue', // Dark blue
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const cellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    transition: 'background-color 0.3s',
  };

  const rowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white', // Light gray for rows
    transition: 'background-color 0.3s',
  });

  const hoverStyle = {
    backgroundColor: '#cce0ff', // Light blue
  };

  const [accountdata, setaccountdata] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get('http://localhost:8080/api/v1/getaccounts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data;
      if (data) {
        setaccountdata(data);
      } else {
        setaccountdata([]);
      }
    });
  }, [accountdata]);

  const handleDelete = (accountNumber) => {
    const token = Cookies.get('token');
    axios.post(`http://localhost:8080/api/v1/setstatus/${accountNumber}`,{},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
    })
    .catch((error) => {
      console.error('Error deleting account:', error);
    });
  };

  return (
    <div>
      <br /><br /><br /><br /><br />
      <div style={containerStyle}>
        <h3 style={{ color: '#003366', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginBottom: '20px' }}>
          Accounts
        </h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Account Id</th>
              <th style={headerStyle}>Account Number</th>
              <th style={headerStyle}>Description</th>
              <th style={headerStyle}>Cnic</th>
              <th style={headerStyle}>MobileNo</th>
              <th style={headerStyle}>AccountType</th>
              <th style={headerStyle}>Balance</th>
              <th style={headerStyle}>UserId</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Update Account</th>
              <th style={headerStyle}>Delete Account</th>
            </tr>
          </thead>
          <tbody>
            {accountdata.map((account, index) => (
              <tr
                key={account.id}
                style={rowStyle(index)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = rowStyle(index).backgroundColor)}
              >
                <td style={cellStyle}>{account.accountId}</td>
                <td style={cellStyle}>{account.accountNumber}</td>
                <td style={cellStyle}>{account.description}</td>
                <td style={cellStyle}>{account.cnic}</td>
                <td style={cellStyle}>{account.mobileNo}</td>
                <td style={cellStyle}>{account.accountType}</td>
                <td style={cellStyle}>{account.balance}</td>
                <td style={cellStyle}>{account.userId}</td>
                <td style={cellStyle}>{account.status}</td>
                
                <td style={cellStyle}>
                  <a 
                    href={`/updateAccount/${account.accountNumber}`} 
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                  >
                    Update
                  </a>
                </td>
                <td style={cellStyle}>
                  <button 
                    onClick={() => handleDelete(account.accountNumber)}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#dc3545', // Red background for delete
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none', // Remove default border
                      textDecoration: 'none',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      fontSize: '14px' // Adjust font size as needed
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')} // Darker red on hover
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <a 
                   href={`/adduser`} 
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                  >
                    + Add Account
                  </a><br></br><br></br>
      </div>
    </div>
  );
};

export default ViewAccounts;
