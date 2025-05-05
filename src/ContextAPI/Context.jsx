import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

const cartContext = createContext();

export default function ({ children }) {


    var getcartItems = JSON.parse(localStorage.getItem('cartItems'));

    const [cartItems, setCartItems] = useState((getcartItems) ? getcartItems : []);
    const [wishlistItems, setWishListItems] = useState([]);


    // const addTocart = () => {
    //     toast.success('Add to cart successfully !!');

    // }

    var data = { cartItems, setCartItems, wishlistItems, setWishListItems};




    return (
        <cartContext.Provider value={data}>
            {children}
        </cartContext.Provider>
    )
}


export { cartContext };
