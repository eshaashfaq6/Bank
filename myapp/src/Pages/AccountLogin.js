import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

import Cookies from 'js-cookie';
function AccountLogin() {
    const navigate=useNavigate();
    const [accountNo,setAccountNo]=useState(0);
    const [pin,setPin]=useState(0);
    const[invalidcredentials,setinvalidcredentials]=useState(false);
    const [accountInvalid,setAccountInvalid]=useState("");
    const [pinInvalid,setPinInvalid]=useState("");
    const accountNoChangeHandler=(event)=>
    {
        setAccountNo(event.target.value);
    }
    const pinChangeHandler=(event)=>
    {
        setPin(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here");        
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);
        axios.get(`http://localhost:8080/api/v1/getuserId/${decoded.sub}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        }).then((res)=>{
            console.log("evaluation",res.data)
            axios.get(`http://localhost:8080/api/v1/accountsByUserId/${res.data}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.accountNumber==accountNo)
                {
                    let user=axios.post("http://localhost:8080/api/v1/accountLogin", {
                        accountNo:accountNo,
                        pin:pin
                    },{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }})
                    .then((res) => {
                        console.log(user);
                        const data = res.data;
                        console.log(data)
                        if (data.message === "Account No not exists")
                        {
                            setAccountInvalid(true);
                        } 
            
                        else if (data.message === "Login success") 
                        {
            
                            navigate(`/transaction/${accountNo}`)
                        } 
                        else if (data.message === "Pin Not match") 
                        {
                            
                            setAccountInvalid(false);
                            setPinInvalid(true);
                        } 
                    })
                    .catch((error) => {
                        console.error("Error during login:", error);
                    });
                }
                else{
                    setinvalidcredentials(true);
                }
            })

            
        }
        )
        
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
                                <h2 class="title">Account Login</h2>
                                <p>Please enter your account number and pin to perform any type of transaction.</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="accountNo">Enter Your Account No</label>
                                            <input type="number" id="accountNo" placeholder="Your Account number here" value={accountNo ||''} name="accountNo" onChange={accountNoChangeHandler}/>
                                            {accountInvalid&&<p className="text-danger">Account No Not Match</p>}
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input ">
                                            <label for="confirmPass">Enter Your Pin</label>
                                            <div class="password-show d-flex align-items-center">
                                                <input type="number" class="passInput" id="confirmPass" autocomplete="off" placeholder="Enter Your Pin" value={pin ||''} name="pin" onChange={pinChangeHandler}/>
                                                
                                                <img class="showPass" src="loginImages/show-hide.png" alt="icon"/>
                                               
                                            </div>
                                            
                                            {pinInvalid&&<p className="text-danger">Pin not Matched.</p>}
                                            {invalidcredentials &&<p className="text-danger">Invalid Credentials!!</p>}
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
export default AccountLogin;