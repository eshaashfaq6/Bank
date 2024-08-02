import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewUsers = () => {
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
    axios.get('http://localhost:8080/api/v1/getusers', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data;

      if (data) {
        data.forEach(transaction => {
          if (Array.isArray(transaction.createdAt)) {
            transaction.createdAt = formatDate(transaction.createdAt);
          } else {
            transaction.createdAt = 'Invalid Date'; // Handle non-array or invalid formats
          }
        });
        setaccountdata(data);
      } else {
        setaccountdata([]);
      }

      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) {
      return 'Invalid Date';
    }

    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleString(); // You can customize the format as needed
  };
  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
      <div style={containerStyle}>
        <h3 style={{ color: '#003366', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginBottom: '20px' }}>
         Users
        </h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              
            <th style={headerStyle}>UserId</th>
            <th style={headerStyle}>UserName</th>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>Address</th>
              <th style={headerStyle}>Roles</th>
              <th style={headerStyle}>Created At</th>
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
                
                <td style={cellStyle}>{account.userId}</td>
                <td style={cellStyle}>{account.uname}</td>
                <td style={cellStyle}>{account.useremail}</td>
                {/* <td style={cellStyle}>{accountNames[index]}</td> */}
                <td style={cellStyle}>{account.useraddress}</td>
                <td style={cellStyle}>{account.roles}</td>
                <td style={cellStyle}>{account.createdAt}</td>
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
                    + Add User
                  </a><br></br><br></br>
      </div>
    </div>
  );
};

export default ViewUsers;
