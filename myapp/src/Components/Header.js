import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    Cookies.remove('token');
    navigate('/');
  };

  const [usershow, setUserShow] = useState(false);
  const [adminshow, setAdminShow] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded)
       
            const data = decoded.role;
            if (data === 'admin') {
              setAdminShow(true);
              setUserShow(false); // Reset userShow if admin
            } else if (data === 'AccountHolder') {
              setUserShow(true);
              setAdminShow(false); // Reset adminShow if user
            } else {
              setAdminShow(false);
              setUserShow(false);
            }
          
    } else {
      console.log('Token not found in cookies');
      setAdminShow(false);
      setUserShow(false);
      // Handle case where token is not found
    }
  }, [token]); // Trigger effect when token changes

  return (
    <>
      <header className="header-section light-blue-bg">
        <div className="overlay">
          <div className="container">
            <div className="row d-flex header-area">
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">
                  <img src="/images/logo.png" className="logo" alt="logo" />
                </a>
                <button
                  className="navbar-toggler collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-content"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbar-content">
                  <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" aria-current="page" href="/">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" aria-current="page" href="/about">
                        About Us
                      </a>
                    </li>
                    {!usershow && (
                      <>
                        {!adminshow && (
                          <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/adminlogin">
                              Admin Login
                            </a>
                          </li>
                        )}
                        {!adminshow && (
                          <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/userlogin">
                              User Login
                            </a>
                          </li>
                        )}
                      </>
                    )}
                    <li className="nav-item">
                      <a className="nav-link" href="/contact">
                        Contact Us
                      </a>
                    </li>
                    {usershow && (
                      <>
                      <li className="nav-item">
                        <a className="nav-link" href="/accountlogin">
                          Transaction
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/myprofile">
                          My Profile
                        </a>
                      </li>
                      </>
                    )}
                    {adminshow && (
                      <>
                      <li className="nav-item dropdown main-navbar">
                        <a
                          className="nav-link dropdown-toggle"
                          href="javascript:void(0)"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                        >
                          Manage User
                        </a>
                        <ul className="dropdown-menu main-menu shadow">
                         
                          <li>
                            <a className="nav-link" href="/adduser">
                              Add Account
                            </a>
                          </li>
                          <li>
                            <a className="nav-link" href="/updateaccounthelp">
                              Update Account
                            </a>
                          </li>
                          <li>
                            <a className="nav-link" href="/deleteaccount">
                              Delete Account
                            </a>
                          </li>
                        
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/viewaccount">
                        All Accounts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/viewuser">
                        All Users
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/alltransac">
                          All Transactions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/depos">
                        Deposit
                        </a>
                      </li>
                       <li className="nav-item">
                        <a className="nav-link" href="/myprofile">
                          My Profile
                        </a>
                      </li>
                      </>
                    )}
                  </ul>
                  {token&& <div className="right-area header-action d-flex align-items-center">
                    <a href="/" onClick={handleLogout} className="cmn-btn">
                      Logout
                    </a>
                  </div>}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
         </>
  );
}

export default Header;
