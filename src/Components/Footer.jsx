import React from 'react'

export default function Footer() {
  return (
    <>
     <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ul>
                                <h6 className="mt-5">Brands</h6>
                                <li><a href="">Adidas</a></li>
                                <li><a href="">Puma</a></li>
                                <li><a href="">Reebok</a></li>
                                <li><a href="">Nike</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <ul>
                                <h6 className="mt-5">Company</h6>
                                <li><a href="">About us</a></li>
                                <li><a href="">Career</a></li>
                                <li><a href="">Find a store</a></li>
                                <li><a href="">Rules and terms</a></li>
                                <li><a href="">Sitemap</a></li>
                            </ul>
                        </div>


                        <div className="col-md-3">
                            <ul>
                                <h6 className="mt-5">Account</h6>
                                <li><a href="">User Login</a></li>
                                <li><a href="">User register</a></li>
                                <li><a href="">Account Setting</a></li>
                                <li><a href="">My Orders</a></li>

                            </ul>
                        </div>

                        <div className="col-md-3">
                            <ul>
                                <h6 className="mt-5">Social</h6>
                                <li><a href=""><i className="fab fa-facebook"></i> Facebook</a></li>
                                <li><a href=""><i className="fab fa-twitter"></i> Twitter</a></li>
                                <li><a href=""><i className="fab fa-instagram"></i> Instagram</a></li>
                                <li><a href=""><i className="fab fa-youtube"></i> Youtube</a></li>

                            </ul>
                        </div>

                    </div>
                </div>
            </footer>
    </>
  )
}
