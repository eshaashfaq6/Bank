import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from "axios";
function AddAccount() {
    const { userId } = useParams();
    const navigate=useNavigate();
    const [cnicExists,setCnicExists]=useState(false);
    const [AccNoExists,setAccNoExists]=useState(false);
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
        const sanitizedValue =event.target.value.replace(/\D/g, '');
        setAccountNumber(sanitizedValue);
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
        const sanitizedValue =event.target.value.replace(/\D/g, '');
        setCNIC(sanitizedValue);
    } 
    const MobileNumberChangeHandler=(event)=>
    {
        setMobileNumber(event.target.value);
        const sanitizedValue =event.target.value.replace(/\D/g, '');
        setMobileNumber(sanitizedValue);
    }
    const balanceChangeHandler=(event)=>
    {
        setBalance(event.target.value);
        const sanitizedValue =event.target.value.replace(/\D/g, '');
        setBalance(sanitizedValue);
    }
    const pinChangeHandler=(event)=>
    {
        setPin(event.target.value);
    }
    const [accountNoTouched,setAccountNoTouched]=useState(false);
    const [descriptionTouched,setDescriptionTouched]=useState(false);
    const [mobileNoTouched,setMobileNoTouched]=useState(false);
    const [pinTouched,setPinTouched]=useState(false);
    const [cincTouched,setCnicTouched]=useState(false);
    const [typeTouched,setTypeTouched]=useState(false);
    const [formTouched,setformTouched]=useState(false);    
    const [formIsValid,setFormIsValid]=useState(false);
    const accountNoBlurHandler = () => {
        setAccountNoTouched(true);
    };
    
    const descriptionBlurHandler = () => {
        setDescriptionTouched(true);
    };
    
    const mobileNoBlurHandler = () => {
        setMobileNoTouched(true);
        
    };
    
    const pinBlurHandler = () => {
        setPinTouched(true);
    };
    
    const cnicBlurHandler = () => {
        setCnicTouched(true);
    };
    
    const typeBlurHandler = () => {
        setTypeTouched(true);
    };
    const validateAccountNo = () => {
        if (accountNumber === "") {
            return "Account Number cannot be empty";
        } 
        else if (!/^\d{10}$/.test(accountNumber)) {
            return "Account Number must be an 10 digit number";
        }
        else {
            return "";
        }
    };
    
    const validateDescription = () => {
        if (accountDescription === "") {
            return "Description cannot be empty";
        } else {
            return "";
        }
    };
    
    const validateMobileNo = () => {
        if (mobileNumber === "") {
            return "Mobile Number cannot be empty";
        } else if (!/^\d{11}$/.test(mobileNumber)) {
            return "Mobile Number must be an 11 digit number";
        } else {
            return "";
        }
    };
    
    const validatePin = () => {
        if (pin === "") {
            return "PIN cannot be empty";
        } else if (!/^\d+$/.test(pin)) {
            return "PIN must be a number";
        } else {
            return "";
        }
    };
    
    const validateCnic = () => {
        if (CNIC === "") {
            return "CNIC cannot be empty";
        } else if (!/^\d{13}$/.test(CNIC)) {
            return "CNIC must be a 13 digit number";
        } else {
            return "";
        }
    };
    
    const validateType = () => {
        if (accountType === "") {
            return "Type cannot be empty";
        } else {
            return "";
        }
    };
    const enteredAccountNoIsValid = validateAccountNo();
    const accountNoIsInvalid = enteredAccountNoIsValid !== "" && accountNoTouched ;
    
    const enteredDescriptionIsValid = validateDescription();
    const descriptionIsInvalid = enteredDescriptionIsValid !== "" && descriptionTouched;
    
    const enteredMobileNoIsValid = validateMobileNo();
    const mobileNoIsInvalid = enteredMobileNoIsValid !== "" && mobileNoTouched;
    
    const enteredPinIsValid = validatePin();
    const pinIsInvalid = enteredPinIsValid !== "" && pinTouched;
    
    const enteredCnicIsValid = validateCnic();
    const cnicIsInvalid = enteredCnicIsValid !== "" && cincTouched ;
    
    const enteredTypeIsValid = validateType();
    const typeIsInvalid = enteredTypeIsValid !== "" && typeTouched;
    

    useEffect(() => {
        if (enteredAccountNoIsValid === "" &&
            enteredDescriptionIsValid === "" &&
            enteredMobileNoIsValid === "" &&
            enteredPinIsValid === "" &&
            enteredCnicIsValid === "" &&
            enteredTypeIsValid === "") {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredAccountNoIsValid, enteredDescriptionIsValid, enteredMobileNoIsValid, enteredPinIsValid, enteredCnicIsValid, enteredTypeIsValid]);

    const formV = !formIsValid && formTouched;

    const handleSubmit = (event) => {
        event.preventDefault();
        setformTouched(true)
        const token = Cookies.get('token');
        if(formIsValid)
            {
        axios.post("http://localhost:8080/api/v1/accounts", {
            accountNumber:accountNumber,
            description:accountDescription,
            cnic:CNIC,
            mobileNo:mobileNumber,
            accountType:accountType,
            balance:balance,
            pin:pin,
            userId:userId,
            status:"active"
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
            }
        else if(error.response && error.response.status === 409)
        {
            setAccNoExists(true);
        }})}
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
                                            <input type="text" id="accountNumber" placeholder="Enter Account Number here" name="accountNumber" value={accountNumber} onChange={AccountNumberChangeHandler} onBlur={accountNoBlurHandler}/>
                                            {accountNoIsInvalid && <p className="text-danger">{enteredAccountNoIsValid}</p>}
                                            {AccNoExists && <p className="text-danger">Account Number Already Exists</p>}

                                        </div> 
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-description">Account Description</label>
                                            <input type="text" id="accountDescription" placeholder="Enter Account Description here" name="accountDescription" value={accountDescription} onChange={AccountDescriptionChangeHandler} onBlur={descriptionBlurHandler}/>
                                        </div> 
                                    </div> 
                                    {descriptionIsInvalid && <p className="text-danger">{enteredDescriptionIsValid}</p>}
           
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-CNIC">CNIC</label>
                                            <input type="text" id="CNIC" placeholder="Enter CNIC here" name="CNIC" pattern="^\d{13}$" value={CNIC} onChange={CnicChangeHandler} onBlur={cnicBlurHandler}/>
                                        </div> 
                                        {cnicIsInvalid && <p className="text-danger">{enteredCnicIsValid}</p>}
                                        {cnicExists && <p className="text-danger">CNIC Already Exists</p>}
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="mobile-number">Mobile Number</label>
                                            <input type="text" id="mobileNumber" placeholder="Enter Mobile Number here" name="mobileNumber" value={mobileNumber} onChange={MobileNumberChangeHandler} onBlur={mobileNoBlurHandler}/>
                                        </div> 
                                    </div>
                                    {mobileNoIsInvalid && <p className="text-danger">{enteredMobileNoIsValid}</p>}
            
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-Type">Account Type</label>
                                            <input type="text" id="accountType" placeholder="Enter Account Type here" name="accountType" value={accountType} onChange={AccountTypeChangeHandler} onBlur={typeBlurHandler}/>
                                        </div> 
                                    </div>{typeIsInvalid && <p className="text-danger">{enteredTypeIsValid}</p>}
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="balance">Balance</label>
                                            <input type="number" min={5000} id="balance" placeholder="Enter Amount here(Minimum 5000)" name="balance" value={balance || ''} onChange={balanceChangeHandler} />
                                        </div> 
                                    </div>
                                    
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="pin">Account Pin</label>
                                            <input type="number" id="pin" placeholder="Enter Account Pin" name="pin" value={pin || ''} onChange={pinChangeHandler} onBlur={pinBlurHandler}/>
                                        </div> 
                                    </div>
                                    {pinIsInvalid && <p className="text-danger">{enteredPinIsValid}</p>}
                                    <div class="col-12">
                                        <div class="single-input">
                                            
                                        </div>
                                    </div>
                                </div>{formV && <p className="text-danger">Form is invalid. Please check the fields.</p>}
            
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