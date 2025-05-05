import React, { useEffect, useState } from 'react'
import Header from './Header'
import ProductCard from './ProductCard'
import axios from 'axios'

export default function Home() {

    var limit = 12;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=${limit}`)
        .then((response) => {
            setProducts(response.data.data)
        })
        .catch((error) => {

        })
    },[]);


return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ul className="list-group mt-5" id="list-ul">
                        <li className="list-group-item">Best Clothes</li>
                        <li className="list-group-item">Automobiles</li>
                        <li className="list-group-item">Home interior</li>
                        <li className="list-group-item">Electronics</li>
                        <li className="list-group-item">Technologies</li>
                        <li className="list-group-item dropdown dropright"><a className="dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Submenu name</a>
                                <a className="dropdown-item" href="#">Greatmenu name</a>
                                <a className="dropdown-item" href="#">Another menu</a>
                                <a className="dropdown-item" href="#">Same others</a>

                            </div>
                        </li>
                    </ul>

                </div>
                <div className="col-md-9">
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner mt-5" id="car">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKdc4-EM4JhSkmgKMC4nIuGKv_dexn7KyXw&usqp=CAU" alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.shopify.com/s/files/1/0074/0429/0111/files/Homepage-free-shipping-banner_1350x600.jpg?v=1591817221" alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://i.pinimg.com/originals/df/c1/f9/dfc1f9ba2734aa94690f009d721440d7.jpg" alt="Third slide"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="products">
            <div className="container">
                <button className="btn btn-sm btn-outline-primary float-right mt-5 but">See all</button>
                <h1 className="pt-5 pb-5">All Products</h1>

                <div className="row">
                    {
                        products.map((v,i) => {
                            return(
                                <ProductCard key={i} productData={v}/>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
        <div className="ok">
            <div className="container">
                <div className="row">

                    <div className="col-md-8">
                        <h3 className="mt-5">Download app demo text</h3>
                        <p>Get an amazing app to make your life easy</p>
                    </div>
                    <div className="col-md-4">
                        <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" className="mt-5" id="cool"/>
                    </div>

                </div>
            </div>

        </div>
        

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header  bg-primary">
                        <h5 className="modal-title text-light" id="exampleModalLabel">Sign In</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                {/* <!--<label for="exampleInputEmail1">Email address</label>--> */}
                                <input type="email" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <div className="form-group">
                                    {/* <!--<label for="exampleInputPassword1">Password</label>--> */}
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </div>
                            <div className="signup">
                                <p className="float-right text-muted">If not registered,<a href="register.html" className="text-muted"> register now!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}