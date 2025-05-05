import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../ContextAPI/Context';


export default function Header() {

    const [categories, setCategories] = useState([]);


    let {cartItems, setCartItems, wishlistItems, setWishListItems, addTocart}=useContext(cartContext);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
        .then((response) => {
            setCategories(response.data.data)
        })
        .catch((error) => {
        toast.error('Something went wrong !!'); 
        });
    },[]);


    return (
        <>
            <ToastContainer />
            <div className='position-sticky top-0 z-3 bg-white'>
            <header className='container-fluid'>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-2 mt-2">
                            <a className="navbar-brand" href="/">
                                <img src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" alt="image of logo" className="img-fluid " />
                            </a>
                        </div>

                        <div className="col-md-7">
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" id="button-addon2">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mt-3 d-flex justify-content-end">
                            <div className="circle me-3">
                                <Link to="view-cart">
                                <FaShoppingCart className='text-muted position-relative'/>
                                <span className=" Counting badge badge-danger bg-danger position-absolute">{cartItems.length}</span>
                                </Link>
                            </div>
                            <div className="circle mr-4">
                                <FaUser className='text-muted' data-target="#exampleModal" data-toggle="modal"/>
                                <span className="badge badge-danger">0</span>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <hr/>
        
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light " id="navbar">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav" id="nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/products">All</Link>
                            </li>

                            {
                                categories.map((v,i) => {
                                    return (
                                    
                                        (i < 10) ? 
                                            
                                                <li className="nav-item" key={i}>
                                                    <Link className="nav-link" to={ `/products/${v.slug}` }>{ v.name }</Link>
                                                </li> 
                                            
                                        : ''

                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                </nav>
            </div>
            <hr id="hr"/>
            </div>
        </>
    )
}