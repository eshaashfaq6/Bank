import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
function DepositHelp()
{
    const navigate=useNavigate();
    const [accountNo,setaccountNo]=useState(0);
    
    const [exists,setNotExists]=useState(false);
    
    const AccountNoChangeHandler=(event)=>
    {
        setaccountNo(event.target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here");
        const token = Cookies.get('token');
        
        axios.get(`http://localhost:8080/api/v1/getAccountId/${accountNo}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
        .then((res) => {
            const data = res.data;
            if(data)
            {
                navigate(`/deposit/${accountNo}`)
            }
            
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setNotExists(true)
               
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
                                <h2 class="title">Cash Deposit</h2>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                               
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="acmount">Please Enter Account Number</label>
                                            <input type="text" id="accountNo" min={0} placeholder="Enter Account No here" name="accountNo" value={accountNo||''} onChange={AccountNoChangeHandler}/>                                       
                                        </div> 
                                    </div>
                                    {exists &&<p className="text-danger" >No account Number  exists</p>}
                                </div>
                                <div class="btn-area">
                                    <button class="cmn-btn">Check</button>
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
export default DepositHelp;