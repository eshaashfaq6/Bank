import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
function Credit()
{
    const navigate=useNavigate();
    const [amount,setAmount]=useState(0);    
    const [recieverAccountNo,setRecieverAmountNo]=useState(0);    
    const [checkRecieverAccountNo,setcheckRecieverAmountNo]=useState(false);
    const [checkBalance,setBalanceCheck]=useState(false);
     const [transferToSelf, setTransferToSelf] = useState(false);
     
     const [accountNo, setAccountNo] = useState(0);
     const [status, setstatus] = useState(false);
    const AmountChangeHandler=(event)=>
    {
        setAmount(event.target.value);
        const sanitizedValue =event.target.value.replace(/\D/g, '');
        setAmount(sanitizedValue);
    }
  
    const recieverAccountNoChangeHandler=(event)=>
        {
            setRecieverAmountNo(event.target.value);
            const sanitizedValue =event.target.value.replace(/\D/g, '');
            setRecieverAmountNo(sanitizedValue);
        
        }
      
        const handleSubmit = async (event) => {
            event.preventDefault();
            const token = Cookies.get('token');
            
            try {
                const accountNoResponse = await axios.get('http://localhost:8080/api/v1/getAccountNoOfLoginUser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                const accountNo = accountNoResponse.data;
                if (recieverAccountNo == accountNo) {
                    setcheckRecieverAmountNo(false);
                    setstatus(false);
                    setTransferToSelf(true);
                    return;
                }
                const recieverIdResponse = await axios.get(`http://localhost:8080/api/v1/getAccountId/${recieverAccountNo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                const recieverId = recieverIdResponse.data;
                if (recieverId) {
                    const statusResponse = await axios.get(`http://localhost:8080/api/v1/getstatus/${recieverAccountNo}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                    if (statusResponse.data === "active") {
                        const creditResponse = await axios.post('http://localhost:8080/api/v1/credit', {
                            transactionAmount: amount,
                            accountIdTo: recieverId,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
        
                        if (creditResponse.data === "Transaction Success") {
                            setcheckRecieverAmountNo(false);
                            setBalanceCheck(false);
                            navigate('/balance');
                        } else if (creditResponse.data === "Insufficient balance") {
                            setcheckRecieverAmountNo(false);
                            setBalanceCheck(true);
                        }
                    } else {
                        setstatus(true);
                        setcheckRecieverAmountNo(false);
                        setTransferToSelf(false);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setcheckRecieverAmountNo(true);
                    setstatus(false);
                    setTransferToSelf(false);
                }
            }
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
                                <h2 class="title">Transfer Amount</h2>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                               
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="acmount">Please Enter your amount</label>
                                            <input type="number" id="amount" min={500} placeholder="Enter Amount here" name="amount" value={amount||''} onChange={AmountChangeHandler}/>                                       
                                        </div> 
                                        { checkBalance && <p className="text-danger">In sufficient Balance</p>}
                                        <div class="single-input">
                                            <label for="account">Enter reciever Account No here</label>
                                            <input type="number" id="recieverAccountNo"  placeholder="Enter recieverAccountNo here" name="recieverAccountNo" value={recieverAccountNo||''} onChange={recieverAccountNoChangeHandler}/>                                       
                                        </div> 
                                        {checkRecieverAccountNo &&<p className="text-danger">No such account exists</p>}
                                        {transferToSelf && <p className="text-danger">You cannot transfer money to your own account</p>} {/* Error for self-transfer */}
                                           {status && <p className="text-danger">Reciever account is inactive</p>}
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <button class="cmn-btn">Transfer</button>
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
export default Credit;