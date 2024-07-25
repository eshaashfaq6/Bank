import React from 'react';
import { useState,useEffect } from 'react';
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
  const [accountdata,setaccountdata]=useState([]);
  useEffect(()=>{
    const token = Cookies.get('token');
      axios.get('http://localhost:8080/api/v1/getusers',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }})
      .then((res) => {
          const data = res.data;
          setaccountdata(data);
         console.log(data);
      })
  },[])
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
      </div>
    </div>
  );
};

export default ViewUsers;
