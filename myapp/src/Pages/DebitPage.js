import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

function CashWithdrawl() {
    let { accountNo } = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [balanceCheck, setBalanceCheck] = useState(false);

    const AmountChangeHandler = (event) => {
        setAmount(event.target.value); const sanitizedValue =event.target.value.replace(/\D/g, '');
        setAmount(sanitizedValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = Cookies.get('token');
        axios.post(`http://localhost:8080/api/v1/transactions/debit`, {
            transactionDescription: "Debit Transaction",
            transactionAmount: amount
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data === "Transaction Success") {
                navigate(`/balance`);
            } else if (res.data === "Insufficient balance") {
                setBalanceCheck(true);
            }
        });
    };

    return (
        <>
            <style>
                {`
                    /* Minimal CSS to reset any custom styles */
                    input[type="number"] {
                        -webkit-appearance: auto;
                        -moz-appearance: auto;
                        appearance: auto;
                        box-sizing: border-box;
                    }
                `}
            </style>
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
                                        <h2 className="title">Cash Withdrawal</h2>
                                    </div>
                                    <form action="#" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="single-input">
                                                    <label htmlFor="amount">Please Enter your amount</label>
                                                    <input
                                                        type="number"
                                                        id="amount"
                                                        min="500"
                                                        placeholder="Enter Amount here"
                                                        name="amount"
                                                        value={amount}
                                                        onChange={AmountChangeHandler}
                                                    />
                                                    {balanceCheck && <p className="text-danger">Insufficient Balance</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-area">
                                            <button className="cmn-btn">Withdraw</button>
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

export default CashWithdrawl;
