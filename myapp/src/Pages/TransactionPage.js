import { useParams,NavLink,useNavigate} from "react-router-dom";
function Transaction() {
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
                                <a href={`/debit`}><h5>Debit/Cash Withdrawl</h5></a>
                                <p>Click the link below to withdraw cash easily from your account. Enjoy hassle-free transactions with our convenient cash withdrawal options.</p>
                                <a href={`/debit`} class="btn-arrow">Cash Withdraw
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
                            <div class="content"> <a href={`/credit`}><h5>Credit/Transfer</h5></a>
                                <p>Click the link below to Transfer money to another account easily from your account. Enjoy hassle-free transactions with our convenient cash withdrawal options.</p>
                                <a href={`/credit`} class="btn-arrow">Transfer
                                    <img src="/images/arrow-right.png" alt="arrow"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-box text-center">
                            <div class="thumb d-flex justify-content-center align-items-center">
                                <img src="/images/checking.png" alt="checking"/>
                            </div>
                            <div class="content">
                            <a href={`/balance`}><h5>Balance Enquiry</h5></a>
                                <p>Click the link below to chcek your balance .Enjoy hassle-free transactions with our convenient cash withdrawal options.</p>
                                <a href={`/balance`} class="btn-arrow">Balance Enquiry
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
                <div class="container">
    <div class="row cus-mar justify-content-center">
        <div class="col-lg-4 col-md-6">
            <div class="single-box text-center">
                <div class="thumb d-flex justify-content-center align-items-center">
                    <img src="/images/business.png" alt="checking"/>
                </div>
                <div class="content">
                    <a href={`/mytransac`}><h5>My Transactions</h5></a>
                    <p>Click the link below to see all transactions of your account. Enjoy hassle-free transactions with our convenient cash withdrawal options.</p>
                    <a href={`/mytransac`} class="btn-arrow">My transactions
                        <img src="/images/arrow-right.png" alt="arrow"/>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="col-lg-4 col-md-6">
            <div class="single-box text-center">
                <div class="thumb d-flex justify-content-center align-items-center">
                    <img src="/images/back.png" alt="checking"/>
                </div>
                <div class="content">
                    <a href={`/`}><h5>Back</h5></a>
                    <p>Click the link below to go back. Enjoy hassle-free transactions with our convenient cash withdrawal options.</p>
                    <a href={`/`} class="btn-arrow">Back
                        <img src="/images/arrow-right.png" alt="arrow"/>
                    </a>
                </div>
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