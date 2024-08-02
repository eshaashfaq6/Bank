function HomePage() {
    return (
     <>
    
    <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
        <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
        <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
        <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
    </div>
    {/* <div class="preloader" id="preloader"></div> */}

    <a href="javascript:void(0)" class="scrollToTop"><i class="fas fa-angle-double-up"></i></a>
    

    <section class="banner-section">
        <div class="overlay">
            <div class="banner-content d-flex align-items-center">
                <div class="container">
                    <div class="row justify-content-start">
                        <div class="col-lg-7 col-md-10">
                            <div class="main-content">
                                <div class="top-area section-text justify-content-center">
                                    <h4 class="sub-title">Simple. Transparent. Secure</h4>
                                    <h1 class="title">Banking Solutions</h1>
                                    <p class="xlr">Products and services designed to help you reach your financial goals.</p>
                                </div>
                                <div class="bottom-area">
                                    <a href="/adminlogin" class="cmn-btn">Open Account</a>
                                    <a href="/contact" class="cmn-btn second">Get in touch</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="partner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-3 col-3">
                        <h4>Partners</h4>
                    </div>
                    <div class="col-md-9 col-9">
                        <div class="partner-box partner-carousel">
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-1.png" alt="image"/>
                                </div>
                            </div>
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-2.png" alt="image"/>
                                </div>
                            </div>
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-3.png" alt="image"/>
                                </div>
                            </div>
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-4.png" alt="image"/>
                                </div>
                            </div>
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-5.png" alt="image"/>
                                </div>
                            </div>
                            <div class="single">
                                <div class="item">
                                    <img src="/images/partner-2.png" alt="image"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="features-section">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="top-section">
                            <span class="head-icon d-flex justify-content-center align-items-center">
                                <img src="/images/notification.png" alt="icon"/>
                            </span>
                            <h5 class="sub-title">Smart Banking</h5>
                            <h2 class="title">Real time Notifications</h2>
                            <p>Your customer stay informed in real time with everything that’s happening on his account:
                                payments, transfer, advice. Get visibility on your customers' flows to anticipate their
                                needs.</p>
                            <ul class="list">
                                <li class="list-item d-flex align-items-center">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>Cards that work all across the world.</span>
                                </li>
                                <li class="list-item d-flex align-items-center ">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>No ATM fees. No minimum balance. No overdrafts.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 text-end">
                        <div class="img-area">
                            <img src="/images/feature-item-1.png" alt="image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="features-section second">
        <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
                <div class="row">
                    <div class="col-lg-6 text-start cus-ord">
                        <div class="img-area">
                            <img src="/images/feature-item-2.png" alt="image"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="top-section">
                            <span class="head-icon d-flex justify-content-center align-items-center">
                                <img src="/images/sheled.png" alt="icon"/>
                            </span>
                            <h5 class="sub-title">Safe Investments</h5>
                            <h2 class="title">The Better Way to Save &amp; Invest</h2>
                            <p>Bankio helps over 2 million customers achieve their financial goals by helping them save
                                and invest with ease. Put that extra cash to use without putting it at risk with Bankio.
                            </p>
                            <ul class="list">
                                <li class="list-item d-flex align-items-center">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>Profitable to invest and Handy to manage</span>
                                </li>
                                <li class="list-item d-flex align-items-center ">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>Highest Returns on your investments</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="solutions-business">
        
    </section>

    <section class="features-section app-download">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="top-section">
                            <span class="head-icon d-flex justify-content-center align-items-center">
                                <img src="/images/sheled.png" alt="icon"/>
                            </span>
                            <h5 class="sub-title">Banking at Your Fingertips</h5>
                            <h2 class="title">Your banking experience anytime, anywhere</h2>
                            <p>Get your money moving with our simple to use, accessible mobile app. As good as a bank
                                branch within your phone!</p>
                            <ul class="list">
                                <li class="list-item d-flex align-items-center">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>Bill Payments ,Funds Transfer ,QR payments</span>
                                </li>
                                <li class="list-item d-flex align-items-center ">
                                    <span class="check d-flex align-items-center justify-content-center">
                                        <img src="/images/check.png" alt="icon"/>
                                    </span>
                                    <span>Credit card payments and Order food</span>
                                </li>
                            </ul>
                        </div>
                     
                    </div>
                    <div class="col-lg-6 text-end">
                        <div class="img-area">
                            <img class="max-un" src="/images/apps.png" alt="image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="card-section">
        <div class="overlay pt-120 pb-120">
           
        </div>
    </section>
    
    <section class="call-action">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-10">
                        <div class="main-content">
                            <div class="section-header text-center">
                                <h2 class="title"><span>Ready to make the leap?</span>Let us help you.</h2>
                            </div>
                            <div class="bottom-area text-center">
                                <a href="register.html" class="cmn-btn">Open Account</a>
                                <a href="contact.html" class="cmn-btn second">Get in touch</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="financial-planning">
        <div class="overlay pt-120 pb-120">
           
        </div>
    </section>
    
    <section class="latest-articles">
        <div class="overlay pt-120 pb-120">
            
        </div>
    </section>
    <section class="get-start wow fadeInUp">
        <div class="overlay">
            <div class="container">
                <div class="col-12">
                    <div class="get-content">
                        <div class="section-text">
                            <h3 class="title">Ready to get started?</h3>
                            <p>It only takes a few minutes to register your FREE Bankio account.</p>
                        </div>
                        <a href="register.html" class="cmn-btn">Open an Account</a>
                        <img src="/images/get-start.png" alt="/images"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
     </>
    );
  }
  
  export default HomePage;