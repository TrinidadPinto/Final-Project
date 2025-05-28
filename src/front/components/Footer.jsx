import React from "react";
import "./Footer.css"; 

 export const Footer = () => {
    return (
        <>
            <footer className="footer-section">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h1 className="footer-logo">
                                Rest<span className="text-green">ing</span>
                            </h1>
                            <p className="text-light">
                                Sed ipsum clita tempor ipsum amet sit ipsum lorem amet labore rebum lorem ipsum dolor.
                            </p>
                            <h6 className="footer-heading">Follow Us</h6>
                            <div className="d-flex gap-2">
                                {["twitter", "facebook-f", "linkedin-in", "instagram"].map((icon, i) => (
                                    <a key={i} href="#" className="social-icon">
                                        <i className={`fab fa-${icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <h6 className="footer-heading">Our Services</h6>
                            <ul className="list-unstyled">
                                {["About", "Destination", "Services", "Packages", "Guides", "Testimonial", "Blog"].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="footer-link">
                                            <i className="fa fa-angle-right me-2"></i>{item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <h6 className="footer-heading">Usefull Links</h6>
                            <ul className="list-unstyled">
                                {["About", "Destination", "Services", "Packages", "Guides", "Testimonial", "Blog"].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="footer-link">
                                            <i className="fa fa-angle-right me-2"></i>{item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <h6 className="footer-heading">Contact Us</h6>
                            <p><i className="fa fa-map-marker-alt me-2"></i>123 Street, New York, USA</p>
                            <p><i className="fa fa-phone-alt me-2"></i>+012 345 67890</p>
                            <p><i className="fa fa-envelope me-2"></i>info@example.com</p>

                            <h6 className="footer-heading mt-4">Newsletter</h6>
                            <form className="newsletter-form">
                                <input type="email" className="form-control px-2" placeholder="Your Email" />
                                <button type="submit" className="btn btn-green mx-2">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom py-3 text-center text-md-start px-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-light">
                            Copyright © <a href="#" className="text-green">2025</a>. All Rights Reserved.
                        </div>
                        <div className="col-md-6 text-md-end text-light">
                            Designed by <a href="#" className="text-green">Grupo 3 on lt-ft-3</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

