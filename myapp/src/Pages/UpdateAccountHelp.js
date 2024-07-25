import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function UpdateAccountHelp() {
    const navigate=useNavigate();
    const [accountNumber,setAccountNumber]=useState("");
    const [checkAccountNumber,setCheckAccountNumber]=useState(false);
    const AccountNumberChangeHandler=(event)=>
    {
        setAccountNumber(event.target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        console.log("i m here");
        axios.get(`http://localhost:8080/api/v1/accountsByAccountNo/${accountNumber}`
            ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }}
        )
        .then((res) => {
            const data = res.data;
            if(data)
            {
                console.log(data);
                navigate(`/updateAccount/${accountNumber}`);
            }
           
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setCheckAccountNumber(true);
                console.log("No account found with account number:", accountNumber);
               
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
                                <h2 class="title">Update Account!</h2>
                                <p>Please Enter account number to edit an account.</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                               
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-number">Account Number</label>
                                            <input type="text" id="accountNumber" placeholder="Enter Account Number here" name="accountNumber" value={accountNumber} onChange={AccountNumberChangeHandler}/>
                                             {checkAccountNumber && <p className="text-danger">No such account number found!</p>}                                        
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
export default UpdateAccountHelp;