import { useParams,NavLink,useNavigate} from "react-router-dom";
function Transaction() {
    let {accountNo}=useParams();
    
    console.log(accountNo)
    return (
     <>
    <section class="solutions-business">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="section-header text-center">
                            <br></br>
                            <h2 class="title">Please Select Your Transaction</h2>
                        </div>
                    </div>
                </div>
                <div class="row cus-mar">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/checking.png" alt="checking"/>
                            </div>
                            <div class="content">
                                <a href={`/debit/${accountNo}`}><h5>Debit/Cash Withdrawl</h5></a>
                                <p>Choose from our checking options that allow you to earn interest, avoid fees, and
                                    easily
                                    manage your account.</p>
                                <a href={`/debit/${accountNo}`} class="btn-arrow">Cash Withdraw
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/savings.png" alt="checking"/>
                            </div>
                            <div class="content">
                            <a href={`/deposit/${accountNo}`}><h5>Credit/Deposit</h5></a>
                                
                                <p>Save for your goals and watch your money grow with a CD, a money market account, a
                                    savings account.Your future starts now.</p>
                                <a href={`/deposit/${accountNo}`} class="btn-arrow">Cash Deposit
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/business.png" alt="checking"/>
                            </div>
                            <div class="content">
                            <a href={`/balance/${accountNo}`}><h5>Balance Enquiry</h5></a>
                                <p>Take charge of your business banking with a business bank account. Services including
                                    virtual cards, team management and more.</p>
                                <a href={`/balance/${accountNo}`} class="btn-arrow">Balance Enquiry
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="section-header text-center">
                            <br></br>
                            
                        </div>
                    </div>
                </div>
                <div class="row cus-mar">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/checking.png" alt="checking"/>
                            </div>
                            <div class="content">
                            <a href={`/mytransac/${accountNo}`}><h5>My Transactions</h5></a>
                                <p>Choose from our checking options that allow you to earn interest, avoid fees, and
                                    easily
                                    manage your account.</p>
                                <a href={`/mytransac/${accountNo}`} class="btn-arrow">My transactions
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/business.png" alt="checking"/>
                            </div>
                            <div class="content"> <a href={`/credit/${accountNo}`}><h5>Credit/Transfer</h5></a>
                                <p>Take charge of your business banking with a business bank account. Services including
                                    virtual cards, team management and more.</p>
                                <a href={`/credit/${accountNo}`} class="btn-arrow">Transfer
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/savings.png" alt="checking"/>
                            </div>
                            <div class="content">
                                <a href={`/changepin/${accountNo}`}><h5>Change Pin</h5></a>
                                <p>Save for your goals and watch your money grow with a CD, a money market account, a
                                    savings account.Your future starts now.</p>
                                <a href={`/changepin/${accountNo}`} class="btn-arrow">Change Pin
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
        
    </section>

 </>
    );
  }
  export default Transaction;