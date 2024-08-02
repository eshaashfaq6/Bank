import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

function UpdateAccount() {
    const { accountNo } = useParams();
    const navigate = useNavigate();

    // Form state
    const [accountNumber, setAccountNumber] = useState("");
    const [accountDescription, setAccountDescription] = useState("");
    const [accountType, setAccountType] = useState("");
    const [CNIC, setCNIC] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [balance, setBalance] = useState("");
    const [accountStatus, setAccountStatus] = useState("");

    // Additional state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    // Validation state
    const [cnicIsInvalid, setCnicIsInvalid] = useState(false);
    const [mobileNoIsInvalid, setMobileNoIsInvalid] = useState(false);
    
    const [accountNumberIsInvalid, setaccountNumberIsInvalid] = useState(false);
    
    const validateCnic = (cnic) => {
        if (cnic && !/^\d{13}$/.test(cnic)) {
            setCnicIsInvalid(true);
        } else {
            setCnicIsInvalid(false);
        }
    }; 
    const validateAccountNumber = (accountNumber) => {
        if (accountNumber && !/^\d{10}$/.test(accountNumber)) {
            setaccountNumberIsInvalid(true);
        } else {
            setaccountNumberIsInvalid(false);
        }
    };
    const validateMobileNo = (mobileNumber) => {
        if (mobileNumber && !/^\d{11}$/.test(mobileNumber)) {
            setMobileNoIsInvalid(true);
        } else {
            setMobileNoIsInvalid(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate fields
        validateCnic(CNIC);
        validateMobileNo(mobileNumber);
        validateAccountNumber(accountNumber)
        if (!cnicIsInvalid && !mobileNoIsInvalid && !accountNumberIsInvalid) {
            const token = Cookies.get('token');
            axios.patch(`http://localhost:8080/api/v1/updateByAccountNo/${accountNo}`, {
                accountNumber,
                description: accountDescription,
                cnic: CNIC,
                mobileNo: mobileNumber,
                balance,
                accountType,
                status:accountStatus,
                useremail: email,
                username: name,
                useraddress: address,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log("Update successful", res.data);
                navigate("/viewaccount");
            }).catch((error) => {
                console.error("Update failed", error);
            });
        }
    };

    return (
        <> 
        <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
            <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
            <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
            <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
        </div>
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
                                                <input type="text" id="accountNumber" placeholder="Enter Account Number here" name="accountNumber" value={accountNumber} onChange={(e) => {
                                                    setAccountNumber(e.target.value)
                                                    const value = e.target.value;
                                                    const sanitizedValue = value.replace(/\D/g, '');
                                                    setAccountNumber(sanitizedValue);
                                                    validateAccountNumber(e.target.value);
                                                }}/>
                                                {accountNumberIsInvalid && <p className="text-danger">Account Number must be 10 digits</p>}
                                            </div> 
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="account-description">Account Description</label>
                                                <input type="text" id="accountDescription" placeholder="Enter Account Description here" name="accountDescription" value={accountDescription} onChange={(e) => setAccountDescription(e.target.value)} />
                                            </div> 
                                        </div> 
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="account-CNIC">CNIC</label>
                                                <input type="text" id="CNIC" placeholder="Enter CNIC here" name="CNIC" value={CNIC} onChange={(e) => {
                                                    setCNIC(e.target.value);
                                                    const value = e.target.value;
                                                    const sanitizedValue = value.replace(/\D/g, '');
                                                    setCNIC(sanitizedValue);
                                                    validateCnic(e.target.value);
                                                }} />
                                            </div> 
                                            {cnicIsInvalid && <p className="text-danger">CNIC must be 13 digits</p>}
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="mobile-number">Mobile Number</label>
                                                <input type="text" id="mobileNumber" placeholder="Enter Mobile Number here" name="mobileNumber" value={mobileNumber} onChange={(e) => {
                                                    setMobileNumber(e.target.value);
                                                    const value = e.target.value;
                                                    const sanitizedValue = value.replace(/\D/g, '');
                                                    setMobileNumber(sanitizedValue);
                                                    validateMobileNo(e.target.value);
                                                }} />
                                            </div> 
                                            {mobileNoIsInvalid && <p className="text-danger">Mobile Number must be 11 digits</p>}
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="balance">Account Balance</label>
                                                <input type="text" id="balance" placeholder="Enter Account balance here" name="balance" value={balance} onChange={(e) => {
                                                    setBalance(e.target.value)
                                                    const value = e.target.value;
                                                    const sanitizedValue = value.replace(/\D/g, '');
                                                    setBalance(sanitizedValue);} }/>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="account-Type">Account Type</label>
                                                <input type="text" id="accountType" placeholder="Enter Account Type here" name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="account-Status">Account Status</label>
                                                <input type="text" id="accountStatus" placeholder="Enter Account Status here" name="accountStatus" value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} />
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="fname">User Name</label>
                                                <input type="text" id="name" placeholder="Enter Name here" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="email">User Email ID</label>
                                                <input type="text" id="email" placeholder="Enter Email ID here" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="address">User Address</label>
                                                <input type="text" id="adress" placeholder="Enter Address here" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <label for="address">User Password</label>
                                                <input type="text" id="password" placeholder="Enter new Password here" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
    );
}

export default UpdateAccount;
