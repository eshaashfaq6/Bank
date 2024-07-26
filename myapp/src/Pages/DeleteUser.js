import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function DeleteUser() {
    const navigate=useNavigate();
    const [userId,setuserId]=useState("");
    const [checkuserId,setCheckuserId]=useState(false);
    const userIdChangeHandler=(event)=>
    {
        setuserId(event.target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("i m here");
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/v1/getUserByUserId/${userId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
        .then((res) => {
            console.log("yahoo");
            const data = res.data;
            if(data)
            {
                console.log(data);
                axios.delete(`http://localhost:8080/api/v1/deleteUserById/${userId}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }})
                .then((res)=>{
                    console.log("idhr")
                    navigate('/viewuser');
                }
                )
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setCheckuserId(true);
               
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
                                <h2 class="title">Delete User! </h2>
                                <p>Please Enter User Id to delete a user.</p>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                               
                                <div class="row">
                                    <div class="col-12">
                                        <div class="single-input">
                                            <label for="account-number">User Id</label>
                                            <input type="text" id="userId" placeholder="Enter User Id here" name="userId" value={userId} onChange={userIdChangeHandler}/>
                                             {checkuserId && <p className="text-danger">No such User Id found!</p>}                                        
                                        </div> 
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <button class="cmn-btn">Delete User</button>
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
export default DeleteUser;