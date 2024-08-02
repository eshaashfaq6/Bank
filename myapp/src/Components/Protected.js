import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure you import this correctly
import AdminLoginPage from '../Pages/AdminLoginPage';
import UserLoginPage from '../Pages/UserLoginPage';

function Protected({ Component, allowedRoles }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRole, setHasRole] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');
    
    if (token) {
      const decoded = jwtDecode(token);
      axios
        .get(`http://localhost:8080/api/v1/getrole/${decoded.sub}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setIsAuthenticated(true);
          if (allowedRoles.includes(data)) {
            setHasRole(true);
          }
         
        });
    }
  }, [allowedRoles]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)', // Adjust based on header/footer height
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    position: 'relative', // Ensure the container is relative for z-index
  };

  const messageStyle = {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: 'auto',
    position: 'relative', // Ensure the message is relative for z-index
    zIndex: 1, // Ensure it's above other elements
    color: 'red', // Set text color to red
  };

  if (!isAuthenticated) {
   
     if (allowedRoles.includes('admin')){
      return <AdminLoginPage />;
    } else {
      return <UserLoginPage />;
    }
  }
  

  if (!hasRole) {
    return (
      <div style={containerStyle}>
        <div style={messageStyle}>
          <h3 className='text-danger'>Permission Denied!!!</h3>
        </div>
      </div>
    );
  }

  return <Component />;
}

export default Protected;
