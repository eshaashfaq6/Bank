import { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
function Balance()
{
    let {accountNo}=useParams();
    const navigate=useNavigate();
    const [balance,setBalance]=useState("");
    useEffect(()=>
    {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/v1/getBalance`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
        .then((res) => {
            const data = res.data;
            if(data)
            {
                setBalance(data);
            }
           
        })
    },[]) 
    return (
     <> 
    <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
        <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
        <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
        <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
    </div>
    
    <section class="personalized-solution">
        <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <img src="/loginImages/image.png" alt="images"/>
                    </div>
                    <div class="col-lg-6">
                        <div class="section-text">
                            <h2 class="title">Your Current Balance:</h2>
                            <h2 className="text-danger">{balance}</h2>
                            <a href={`/transaction/${accountNo}`} class="btn-arrow"><p color="black">back</p>
                                    
                                </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    <br></br>
  
  </>
)}
export default Balance;