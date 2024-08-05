import React from 'react';
import { useState,useEffect} from 'react';

import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Cookies from 'js-cookie';
const MyTansactions = () => {
    
    let {accountNo}=useParams();
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
  const [transactionsdata,setTransactions]=useState([]);
  
  useEffect(() => {
    const token = Cookies.get('token');
  
    axios.get(`http://localhost:8080/api/v1/getAccountId/${accountNo}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      const data = res.data;
      if (data) {
        axios.get(`http://localhost:8080/api/v1/transactionsByAccountId/${data}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((res) => {
          const transactionData = res.data; 
  
          const promises = transactionData.map((transaction, i) => {
            const promises = [];
  
            if (transaction.accountIdFrom != null) {
              const accountIdFrom = transaction.accountIdFrom;
              promises.push(
                axios.get(`http://localhost:8080/api/v1/getAccountNo/${accountIdFrom}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }).then((res) => {
                  transactionData[i].accountIdFrom = res.data;
                })
              );
            }
  
            if (transaction.accountIdTo != null) {
              const accountIdTo = transaction.accountIdTo;
              promises.push(
                axios.get(`http://localhost:8080/api/v1/getAccountNo/${accountIdTo}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }).then((res) => {
                  transactionData[i].accountIdTo = res.data;
                })
              );
            }
  
            return Promise.all(promises);
          });
  
          Promise.all(promises).then(() => {
            if (Array.isArray(transactionData)) {
              transactionData.forEach(transaction => {
                transaction.transactionDate = formatDate(transaction.transactionDate);
            });
              setTransactions(transactionData); 
            }
          });
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log("No transactions found for the account.");
            setTransactions([]); 
          }})
      }
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log("No transactions found for the account.");
        setTransactions([]); 
      }
    });
  }, []);
  
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second, nanosecond] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toLocaleString(); // You can customize the format as needed
};         
      
  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
      <div style={containerStyle}>
        <h3 style={{ color: '#003366', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginBottom: '20px' }}>
         Transactions
        </h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              
              <th style={headerStyle}>Transaction Id</th>
              <th style={headerStyle}>Transaction Date</th>
              <th style={headerStyle}>Transaction Description</th>
              <th style={headerStyle}>Transaction Amount</th>
              <th style={headerStyle}>Transaction Indicator</th>
              <th style={headerStyle}>Account From</th>
              <th style={headerStyle}>Account To</th>
            </tr>
          </thead>
          <tbody>
            {transactionsdata.map((transactions, index) => (
              <tr
                key={transactions.id}
                style={rowStyle(index)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = rowStyle(index).backgroundColor)}
              >
                
                <td style={cellStyle}>{transactions.transactionId}</td>
                <td style={cellStyle}>{transactions.transactionDate}</td>
                {/* <td style={cellStyle}>{accountNames[index]}</td> */}
                <td style={cellStyle}>{transactions.transactionDescription}</td>
                <td style={cellStyle}>{transactions.transactionAmount}</td>
                <td style={cellStyle}>{transactions.transactionIndicator}</td>
                {transactions.transactionIndicator === "CR" ? (
                    <>
                      <td style={cellStyle}>{transactions.accountIdTo}</td>
                      <td style={cellStyle}></td> {/* Empty cell for Account From */}
                    </>
                  ) : (
                    <>
                      <td style={cellStyle}>{transactions.accountIdFrom}</td>
                      <td style={cellStyle}>{transactions.accountIdTo}</td>
                    </>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTansactions;