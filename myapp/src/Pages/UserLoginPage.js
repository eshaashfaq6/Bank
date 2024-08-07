import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import CryptoJS from "crypto-js";
function UserLoginPage() {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPasssword]=useState("");
    const [active,setActive]=useState(false);
    const [credentialsInvalid,setCredentialsInvalid]=useState(false);
    const emailChangeHandler=(event)=>
    {
        setEmail(event.target.value);
    }
    const passwordChangeHandler=(event)=>
    {
        setPasssword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const hashedPassword = CryptoJS.SHA256(password).toString();
        let user=axios.post("http://localhost:8080/api/v1/login", {
            useremail: email,
            password: hashedPassword,
        })
        .then((res) => {
            console.log(res.data.token);
            if(res.data)
            {
                const token = res.headers.authorization.split(' ')[1]; 
                Cookies.set('token',token, { expires: 7 });
                const decoded = jwtDecode(token);
                navigate("/myprofile")
            }
        })
        .catch((error) => { 
            if (error.response && error.response.status === 403) {
            console.error("Authentication failed: Invalid credentials");
            }
            if (error.response && error.response.status === 404) {
              setActive(true);
             }
          setCredentialsInvalid(true);
        });
    };   
    return (
     <>    
    <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
        <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
        <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
        <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
    </div>
   
    <div class="preloader" id="preloader"></div>
    <a href="javascript:void(0)" class="scrollToTop"><i class="fas fa-angle-double-up"></i></a>
    
    <section class="sign-in-up login">
        <div class="overlay pt-120 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-content">
                            <div class="section-header">
                                <h5 class="sub-title">The Power of Financial Freedom</h5>
                                <h2 class="title">User Login</h2>
                                <p>Your security is our top priority. You'll need this to log into your bankio account</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="email">Enter Your Email ID</label>
                                            <input type="text" id="email" placeholder="Your email ID here" value={email} name="email" onChange={emailChangeHandler}/>
                                            
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input ">
                                            <label for="confirmPass">Enter Your Password</label>
                                            <div class="password-show d-flex align-items-center">
                                                <input type="text" class="passInput" id="confirmPass" autocomplete="off" placeholder="Enter Your Password" value={password} name="password" onChange={passwordChangeHandler}/>
                                                
                                                <img class="showPass" src="/loginImages/show-hide.png" alt="icon"/>
                                               
                                            </div>
                                           
                                            {credentialsInvalid&&<p className="text-danger">Invalid credentials</p>}
                                            {active&&<p className="text-danger">Not Active User </p>}
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <button class="cmn-btn">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
     </>
     )}
export default UserLoginPage;