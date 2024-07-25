function ContactUsPage() {
    return (
    
<>
   
    <div class="position-fixed d-flex flex-column text-center" id="draggableDiv">
        <button id="btn-ltr" class="cmn-btn rounded-2 py-2 px-3">LTR</button>
        <span class="draggable py-2"><i class="fas fa-arrows-alt xxlr m-0"></i></span>
        <button id="btn-rtl" class="cmn-btn rounded-2 py-2 px-3">RTL</button>
    </div>
    
    <div class="preloader" id="preloader"></div>
   
    <a href="javascript:void(0)" class="scrollToTop"><i class="fas fa-angle-double-up"></i></a>
   
    <section class="banner-section inner-banner contact">
        <div class="overlay">
            <div class="banner-content d-flex align-items-center">
                <div class="container">
                    <div class="row justify-content-start">
                        <div class="col-lg-7 col-md-10">
                            <div class="main-content">
                                <h1>Contact Us</h1>
                                <div class="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb d-flex align-items-center">
                                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="apply-for-loan contact">
        <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="section-header text-center">
                            <h2 class="title">Get in touch with us.</h2>
                            <p>Fill up the form and our team will get back to you within 24 hours</p>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="form-content">
                            <form class="contact-form" id="contact_form_submit">
                                <div class="row gy-4">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="surename">Your Company Name</label>
                                            <input type="text" placeholder="Enter Your Company Name" required="" id="surename"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="phone">Phone Number</label>
                                            <input type="text" placeholder="Enter Your Phone Number" required="" id="phone"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="email">Your Email </label>
                                            <input type="text" placeholder="Enter Your Email" required="" id="email"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="subject">Your Subject</label>
                                            <input type="text" placeholder="Enter Your Subject" required="" id="subject"/>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group mb-0">
                                            <label for="message">Your Message </label>
                                            <textarea required="" id="message" placeholder="Enter Your Message"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-area text-center">
                                    <button class="cmn-btn">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="account-feature loan-feature need-more-help">
        <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="section-header text-center">
                            <h5 class="sub-title">You can reach out to us for all your</h5>
                            <h2 class="title">Need More Help?</h2>
                            <p>Queries, complaints and feedback. We will be happy to serve you</p>
                        </div>
                    </div>
                </div>
                <div class="row cus-mar">
                    <div class="col-md-4">
                        <div class="single-box">
                            <div class="icon-box">
                                <img src="contactImages/need-help-1.png" alt="icon"/>
                            </div>
                            <h5>Sales</h5>
                            <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0370626f66704361626d686a6c2d606c6e">[email�&nbsp;protected]</a></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="single-box">
                            <div class="icon-box">
                                <img src="contactImages/need-help-2.png" alt="icon"/>
                            </div>
                            <h5>Help &amp; Support</h5>
                            <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1f6c6a6f6f706d6b6c5f7d7e71747670317c7072">[email�&nbsp;protected]</a></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="single-box">
                            <div class="icon-box">
                                <img src="contactImages/need-help-3.png" alt="icon"/>
                            </div>
                            <h5>Media &amp; Press</h5>
                            <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="e48981808d85a486858a8f8d8bca878b89">[email�&nbsp;protected]</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="faqs-section account">
        <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-6">
                        <div class="section-header text-center">
                            <h5 class="sub-title">If you have question,we have answer</h5>
                            <h2 class="title">Frequently asked questions</h2>
                            <p>Get answers to all questions you have and boost your knowledge so you can save, invest
                                and spend smarter. <a href="faqs.html">See all questions here!</a></p>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-8">
                        <div class="faq-box wow fadeInUp">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How do I locate the nearesty branch or ATM?
                                        </button>
                                    </h5>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            What do I do if I lose my card or it gets stolen?
                                        </button>
                                    </h5>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            What is your customer service number?
                                        </button>
                                    </h5>
                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingFive">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            How do I reset my pin?
                                        </button>
                                    </h5>
                                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingsix">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                                            What is required to use Digital Banking?
                                        </button>
                                    </h5>
                                    <div id="collapsesix" class="accordion-collapse collapse" aria-labelledby="headingsix" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h5 class="accordion-header" id="headingsaven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsesaven" aria-expanded="false" aria-controls="collapsesaven">
                                            Is digital banking secure?
                                        </button>
                                    </h5>
                                    <div id="collapsesaven" class="accordion-collapse collapse" aria-labelledby="headingsaven" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>If your card is missing, let us know immediately. We’ll block your card
                                                right away send over a new one on the same day.To report a lost or
                                                stolen card, call us at (406) 555-0120.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        <img src="contactImages/get-start.png" alt="Images"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
    );
  }
  
  export default ContactUsPage;