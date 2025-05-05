import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/cart.css'
import { cartContext } from '../ContextAPI/Context';
import { toast } from 'react-toastify';

export default function CardListing() {

    let {cartItems, setCartItems} = useContext(cartContext);

    let [total, setTotal] = useState(0);

    useEffect(() => {
        var sum = 0;
        cartItems.forEach((v) => {
            sum += v.price * v.quantity
        })
        setTotal(sum);
    },[cartItems])

    const cartUpdate = (id,type) => {
        const finalData = cartItems.map((v) => {
            if(v.id == id){
                if(type == 'minus'){
                    if(v.quantity > 1){
                        v.quantity--;
                        toast.success('Cart update succesfully');
                        return v;
                    } else {
                        toast.error('Minimun 1 quatity required');
                        return v;
                    }
                } else {
                    if(v.quantity < 5){
                        v.quantity++;
                        toast.success('Cart update succesfully');
                        return v;
                    } else {
                        toast.error('Maximum quatity reached');
                        return v;
                    }
                }
            } else {
                return v;
            }
        })

        setCartItems([...finalData]);
        localStorage.setItem('cartItems',JSON.stringify(finalData));
    }

    const deleteCart = (id) => {
        if(confirm('Are you sure you want to delete ?')){
            var finalData = cartItems.filter((v) => {
                if(v.id != id){
                    return v;
                }
            })

            setCartItems([...finalData]);
            localStorage.setItem('cartItems',JSON.stringify(finalData));
        }
    }

    return (
        <>
            <div className="container py-3">
                <h3>Shopping Cart</h3>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        {/* <!-- single cart item  --> */}
                        <hr />

                        {
                            cartItems.map((v,i) => {
                                return(
                                    <>
                                        <div className="cart-item py-2" key={i}>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <img
                                                            className="cart-image d-block"
                                                            src={ v.image }
                                                            alt=""
                                                        />
                                                        <div className="mx-3">
                                                            <h5>{ v.name }</h5>
                                                            <p>Lorem ipsum, dolor sit</p>
                                                            <h5>Rs. { v.price }</h5>
                                                            <small
                                                                className="text-white bg-success px-2 py-1 d-inline-block rounded-3 mt-2"
                                                            >In Stock</small
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <button className="btn btn-primary" onClick={ () => cartUpdate(v.id, 'minus') }>-</button>
                                                            <span className="mx-2">{ v.quantity }</span>
                                                            <button className="btn btn-primary" onClick={ () => cartUpdate(v.id, 'plus') }>+</button>
                                                        </div>
                                                        <div>
                                                            Rs { v.price } * { v.quantity } = Rs { v.quantity * v.price }
                                                        </div>
                                                        <div>
                                                            <button onClick={ () => deleteCart(v.id)}
                                                                type="button"
                                                                className="btn-close"
                                                                aria-label="Close"
                                                            ></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            })
                        }
                        
                        
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-4">
                        <div className="bg-light rounded-3 p-4 ">
                            <h6 className="mb-4">Order Summary</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>Subtotal</div>
                                <div><strong>Rs. {total}</strong></div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div>Delivery Charge</div>
                                <div><strong>Rs. 100</strong></div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div>Total</div>
                                <div><strong>Rs.5100</strong></div>
                            </div>
                            <button className="btn btn-primary w-100 mt-4">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}