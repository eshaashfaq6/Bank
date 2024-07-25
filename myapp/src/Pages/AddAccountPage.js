import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from "axios";
function AddAccount() {
    const { userId } = useParams();
    const navigate=useNavigate();
    const [cnicExists,setCnicExists]=useState(false);
    const [accountNumber,setAccountNumber]=useState("");
    const [accountDescription,setAccountDescription]=useState("");
    const [accountType,setAccountType]=useState("");
    const [CNIC,setCNIC]=useState("");
    const [mobileNumber,setMobileNumber]=useState("");
    const [balance,setBalance]=useState(0);
    const [pin,setPin]=useState(0);
    const AccountNumberChangeHandler=(event)=>
    {
        setAccountNumber(event.target.value);
    }
    const AccountTypeChangeHandler=(event)=>
    {
        setAccountType(event.target.value);
    } 
    const AccountDescriptionChangeHandler=(event)=>
    {
        setAccountDescription(event.target.value);
    }
    const CnicChangeHandler=(event)=>
    {
        setCNIC(event.target.value);
    } 
    const MobileNumberChangeHandler=(event)=>
    {
        setMobileNumber(event.target.value);
    }
    const balanceChangeHandler=(event)=>
    {
        setBalance(event.target.value);
    }
    const pinChangeHandler=(event)=>
    {
        setPin(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here",userId);
        const token = Cookies.get('token');
        console.log(token)
        axios.post("http://localhost:8080/api/v1/accounts", {
            accountNumber:accountNumber,
            description:accountDescription,
            cnic:CNIC,
            mobileNo:mobileNumber,
            accountType:accountType,
            balance:balance,
            pin:pin,
            userId:userId
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
        .then((res) => {
            console.log("yahoo");
            const data = res.data;
            
           console.log(data);
           navigate("/viewaccount")
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
               setCnicExists(true);
            }})
    };
    return (
     <> 
    <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
        <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
        <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
        <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
    </div>
    {/* <div class="preloader" id="preloader"></div> */}
    
    <a href="javascript:void(0)" class="scrollToTop"><i class="fas fa-angle-double-up"></i></a>
    <section class="sign-in-up register">
        <div class="overlay pt-120 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-content">
                            <div class="section-header">
                                <h5 class="sub-title">The Power of Financial Freedom</h5>
                                <h2 class="title">Add Account!</h2>
                                <p>Please Enter your account number to complete the procces of adding a user.</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                               
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-number">Account Number</label>
                                            <input type="text" id="accountNumber" placeholder="Enter Account Number here" name="accountNumber" value={accountNumber} onChange={AccountNumberChangeHandler}/>
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-description">Account Description</label>
                                            <input type="text" id="accountDescription" placeholder="Enter Account Description here" name="accountDescription" value={accountDescription} onChange={AccountDescriptionChangeHandler}/>
                                        </div> 
                                    </div> 
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-CNIC">CNIC</label>
                                            <input type="text" id="CNIC" placeholder="Enter CNIC here" name="CNIC" value={CNIC} onChange={CnicChangeHandler}/>
                                        </div> 
                                        
                                        {cnicExists && <p className="text-danger">CNIC Already Exists</p>}
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="mobile-number">Mobile Number</label>
                                            <input type="text" id="mobileNumber" placeholder="Enter Mobile Number here" name="mobileNumber" value={mobileNumber} onChange={MobileNumberChangeHandler}/>
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-Type">Account Type</label>
                                            <input type="text" id="accountType" placeholder="Enter Account Type here" name="accountType" value={accountType} onChange={AccountTypeChangeHandler}/>
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="balance">Balance</label>
                                            <input type="number" min={5000} id="balance" placeholder="Enter Amount here(Minimum 5000)" name="balance" value={balance || ''} onChange={balanceChangeHandler}/>
                                        </div> 
                                    </div>
                                    
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="pin">Account Pin</label>
                                            <input type="number" id="pin" placeholder="Enter Account Pin" name="pin" value={pin || ''} onChange={pinChangeHandler}/>
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <button class="cmn-btn">Submit Now</button>
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
export default AddAccount;