import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from "axios";
function AddUser() {
    const [formIsValid,setFormIsValid]=useState(false);
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPasssword]=useState("");
    const [address,setAddress]=useState("");

    const [nameTouched,setNameTouched]=useState(false);
    const [emailTouched,setEmailTouched]=useState(false);
    const [passwordTouched,setPassswordTouched]=useState(false);
    const [addressTouched,setAddressTouched]=useState(false);
    const [formTouched,setformTouched]=useState(false);

    
    const [emailExists,setEmailExists]=useState(false);

    const nameBlurHandler=()=>
    {
        setNameTouched(true);
    }
    const emailBlurHandler=()=>
    {
        setEmailTouched(true);
    }
    const passwordBlurHandler=()=>
    {
        setPassswordTouched(true);
    }
    const addressBlurHandler=()=>
    {
        setAddressTouched(true);
    }

    const validateName=()=>{
        if(name === "")
        {
            return  "Name cannot be empty"
        }
        else{
            return "";
        }

    }
    const validateEmail=()=>{
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email === "")
        {
            return  "Email cannot be empty"
        }
        else if(!re.test(email)){
            return "Email is invalid"
        }
        else{
            return "";
        }

    }
    const validatePassword=()=>{
        const pass_patter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if(password === "")
        {
            return  "Password cannot be empty"
        }
        else if(!pass_patter.test(password))
        {
            return  "This is not a valid password! Password must be 8 to 15 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@, ., #, $, !, %, *, ?, &, ^)"
        }
        else{
            return "";
        }

    }
    const validateAddress=()=>{
        if(address === "")
        {
            return  "Address cannot be empty"
        }
        else{
            return "";
        }

    }

    const enteredNameIsValid=validateName();
    const nameIsInValid=enteredNameIsValid!=""&&nameTouched;

    const enteredEmailIsValid=validateEmail();
    const emailIsInValid=enteredEmailIsValid!=""&&emailTouched;
    
    const enteredAddressIsValid=validateAddress();
    const addressIsInValid=enteredAddressIsValid!=""&&addressTouched; 
    
    const enteredPasswordIsValid=validatePassword();
    const passwordIsInValid=enteredPasswordIsValid!=""&&passwordTouched;






    const nameChangeHandler=(event)=>
    {
        setName(event.target.value);
    }
    const emailChangeHandler=(event)=>
    {
        setEmail(event.target.value);
    }
    const passwordChangeHandler=(event)=>
    {
        setPasssword(event.target.value);
    }
    const addressChangeHandler=(event)=>
    {
        setAddress(event.target.value);
    }


    useEffect(()=>{
        if(enteredNameIsValid==""&&enteredAddressIsValid==""&&enteredEmailIsValid==""&&enteredPasswordIsValid=="")
        {
            setFormIsValid(true);
        }
        else{
            setFormIsValid(false);
        }
    },[enteredNameIsValid,enteredEmailIsValid,enteredPasswordIsValid,enteredAddressIsValid])


    const formV=!formIsValid&&formTouched;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here");
        setformTouched(true)
        if(formIsValid)
        {
        const token = Cookies.get('token');
        
        axios.post("http://localhost:8080/api/v1/users", {
            username:name,
            useremail: email,
            useraddress:address,
            password: password
        },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }})
        .then((res) => {
            const data = res.data;
           console.log(data);
           navigate(`/addaccount/${data.userId}`)
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
               console.log("CHutti")
               setEmailExists(true);
            }})
    }
    else{
        console.log("invaliddddd")
    }
       
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
    <section class="sign-in-up register">
        <div class="overlay pt-120 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-content">
                            <div class="section-header">
                                <h5 class="sub-title">The Power of Financial Freedom</h5>
                                <h2 class="title">Add User!</h2>
                                <p>Please Enter your Email Address to Start your Online Application</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="fname">Name</label>
                                            <input type="text" id="name" placeholder="Enter Name here" name="name" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
                                        </div>
                                        {nameIsInValid && <p className="text-danger">{enteredNameIsValid}</p>}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="email">Email ID</label>
                                            <input type="text" id="email" placeholder="Enter Email ID here" name="email" value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
                                        </div> 
                                        {emailIsInValid && <p className="text-danger">{enteredEmailIsValid}</p>}
                                        {emailExists&& <p className="text-danger">Email Already Exists</p>}

                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="address">Address</label>
                                            <input type="text" id="adress" placeholder="Enter Address here" name="address" value={address} onChange={addressChangeHandler} onBlur={addressBlurHandler}/>
                                        </div> 
                                        {addressIsInValid && <p className="text-danger">{enteredAddressIsValid}</p>}
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input ">
                                            <label for="confirmPass">Password</label>
                                            <div class="password-show d-flex align-items-center">
                                                <input type="text" class="passInput" id="confirmPass" autocomplete="off" placeholder="Enter Password here" name="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
                                                <img class="showPass" src="loginImages/show-hide.png" alt="icon"/>
                                            </div>
                                        </div>
                                        {passwordIsInValid && <p className="text-danger">{enteredPasswordIsValid}</p>}
                                    </div>
                                    <div class="col-12">
                                        <div class="single-input">
                                            <p>By clicking submit, you agree to <span>Bankio's Terms of Use, Privacy Policy, E-sign</span> &amp; <span>communication Authorization.</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-area">
                                {formV&&<p className="text-danger">kindly fill all details and correctly.</p>}
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
export default AddUser;