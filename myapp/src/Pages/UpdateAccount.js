import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
function UpdateAccount() {
    const { accountNo } = useParams();
    const navigate=useNavigate();
    const [accountNumber,setAccountNumber]=useState("");
    const [accountDescription,setAccountDescription]=useState("");
    const [accountType,setAccountType]=useState("");
    const [CNIC,setCNIC]=useState("");
    const [mobileNumber,setMobileNumber]=useState("");
    const [balance,setBalance]=useState(0);
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
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    
    const [password,setPassword]=useState("");


    const nameChangeHandler=(event)=>
    {
        setName(event.target.value);
    }
    const emailChangeHandler=(event)=>
    {
        setEmail(event.target.value);
    }
    const addressChangeHandler=(event)=>
    {
        setAddress(event.target.value);
    }
    const passwordChangeHandler=(event)=>
        {
            setPassword(event.target.value);
        }


   


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here",accountNo);
        const token = Cookies.get('token');
        axios.patch(`http://localhost:8080/api/v1/updateByAccountNo/${accountNo}`, {
            
            accountNumber:accountNumber,
            description:accountDescription,
            cnic:CNIC,
            mobileNo:mobileNumber,
            balance:balance,
            accountType:accountType,
            useremail:email,
            username:name,
            useraddress:address,
            password:password
        }  ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
        .then((res) => {
            console.log("yahoo");
            const data = res.data;
            navigate("/viewaccount")
           console.log(data);
        })
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
                                <h2 class="title">Update Account: {accountNo}</h2>
                                <p>Please Enter your new data to update account.</p>
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
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="mobile-number">Mobile Number</label>
                                            <input type="text" id="mobileNumber" placeholder="Enter Mobile Number here" name="mobileNumber" value={mobileNumber} onChange={MobileNumberChangeHandler}/>
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                    <div class="single-input">
                                            <label for="balance">Account Balance</label>
                                            <input type="number" id="balance" min={0} placeholder="Enter Account balance here" name="balance" value={balance ||''} onChange={balanceChangeHandler}/>
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
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="fname">User Name</label>
                                            <input type="text" id="name" placeholder="Enter Name here" name="name" value={name} onChange={nameChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="email">User Email ID</label>
                                            <input type="text" id="email" placeholder="Enter Email ID here" name="email" value={email} onChange={emailChangeHandler} />
                                        </div> 

                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="address">User Address</label>
                                            <input type="text" id="adress" placeholder="Enter Address here" name="address" value={address} onChange={addressChangeHandler} />
                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="address">User Passowrd</label>
                                            <input type="text" id="password" placeholder="Enter new Password here" name="password" value={password} onChange={passwordChangeHandler}/>
                                        </div> 
                                    </div>
                                   
                                   
                                </div>
                               
                                    
                                <div class="btn-area">
                                    <button class="cmn-btn">Update Account</button>
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
export default UpdateAccount;