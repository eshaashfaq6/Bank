import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

function UpdateAccount() {
    const { accountNo } = useParams();
    const [accdata, setAccData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        
        axios.get(`http://localhost:8080/api/v1/accounts/ByaccountNo/${accountNo}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setAccData(res.data);
        }).catch((error) => {
            if(error.response && error.response.status==404)
            {
            console.error("Not Found");
            }
        });
    }, [accountNo]);
    
    useEffect(() => {
        if (accdata) {
            setAccountNumber(accdata.accountNumber || "");
            setAccountDescription(accdata.description || "");
            setAccountType(accdata.accountType || "");
            setCNIC(accdata.cnic || "");
            setMobileNumber(accdata.mobileNo || "");
            setBalance(accdata.balance || "");
            setAccountStatus(accdata.status || "");
            setName(accdata.useremail || "");
            setEmail(accdata.username || "");
            setAddress(accdata.useraddress || "");
            setPassword(""); // Don't pre-fill password
        }
    }, [accdata]);

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
    const [accountNumberIsInvalid, setAccountNumberIsInvalid] = useState(false);
    
    const validateCnic = (cnic) => {
        setCnicIsInvalid(!/^\d{13}$/.test(cnic));
    }; 

    const validateAccountNumber = (accountNumber) => {
        setAccountNumberIsInvalid(!/^\d{10}$/.test(accountNumber));
    };

    const validateMobileNo = (mobileNumber) => {
        setMobileNoIsInvalid(!/^\d{11}$/.test(mobileNumber));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate fields
        validateCnic(CNIC);
        validateMobileNo(mobileNumber);
        validateAccountNumber(accountNumber);
        if (!cnicIsInvalid && !mobileNoIsInvalid && !accountNumberIsInvalid) {
            const token = Cookies.get('token');
            axios.patch(`http://localhost:8080/api/v1/accounts/${accountNo}`, {
                accountNumber,
                description: accountDescription,
                cnic: CNIC,
                mobileNo: mobileNumber,
                balance,
                accountType,
                status: accountStatus,
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
                if(error.response && error.response==404)
                {
                    console.log("No such accout found")
                }
            });
        }
    };

    return (
        <> 
        <div className="position-fixed d-flex flex-column text-center" id="draggableDiv">
            <button id="btn-ltr" className="cmn-btn rounded-2 py-2 px-3">LTR</button>
            <span className="draggable py-2"><i className="fas fa-arrows-alt xxlr m-0"></i></span>
            <button id="btn-rtl" className="cmn-btn rounded-2 py-2 px-3">RTL</button>
        </div>
        <a href="javascript:void(0)" className="scrollToTop"><i className="fas fa-angle-double-up"></i></a>
        <section className="sign-in-up register">
            <div className="overlay pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="form-content">
                                <div className="section-header">
                                    <h5 className="sub-title">The Power of Financial Freedom</h5>
                                    <h2 className="title">Update Account: {accountNo}</h2>
                                    <p>Please Enter your new data to update account.</p>
                                </div>
                                <form action="#" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="account-number">Account Number</label>
                                                <input type="text" id="accountNumber" placeholder="Enter Account Number here" name="accountNumber" value={accountNumber} onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setAccountNumber(value);
                                                    validateAccountNumber(value);
                                                }}/>
                                                {accountNumberIsInvalid && <p className="text-danger">Account Number must be 10 digits</p>}
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="account-description">Account Description</label>
                                                <input type="text" id="accountDescription" placeholder="Enter Account Description here" name="accountDescription" value={accountDescription} onChange={(e) => setAccountDescription(e.target.value)} />
                                            </div> 
                                        </div> 
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="account-CNIC">CNIC</label>
                                                <input type="text" id="CNIC" placeholder="Enter CNIC here" name="CNIC" value={CNIC} onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setCNIC(value);
                                                    validateCnic(value);
                                                }} />
                                                {cnicIsInvalid && <p className="text-danger">CNIC must be 13 digits</p>}
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="mobile-number">Mobile Number</label>
                                                <input type="text" id="mobileNumber" placeholder="Enter Mobile Number here" name="mobileNumber" value={mobileNumber} onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setMobileNumber(value);
                                                    validateMobileNo(value);
                                                }} />
                                                {mobileNoIsInvalid && <p className="text-danger">Mobile Number must be 11 digits</p>}
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="balance">Account Balance</label>
                                                <input type="text" id="balance" placeholder="Enter Account balance here" name="balance" value={balance} onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setBalance(value);
                                                }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="account-Type">Account Type</label>
                                                <input type="text" id="accountType" placeholder="Enter Account Type here" name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="account-Status">Account Status</label>
                                                <input type="text" id="accountStatus" placeholder="Enter Account Status here" name="accountStatus" value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="fname">User Name</label>
                                                <input type="text" id="name" placeholder="Enter Name here" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="email">User Email ID</label>
                                                <input type="text" id="email" placeholder="Enter Email ID here" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="address">User Address</label>
                                                <input type="text" id="address" placeholder="Enter Address here" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="password">User Password</label>
                                                <input type="password" id="password" placeholder="Enter new Password here" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="btn-area">
                                        <button className="cmn-btn">Update Account</button>
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
