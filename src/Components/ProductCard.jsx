import React, { useContext } from 'react'
import { cartContext } from '../ContextAPI/Context'
import { toast } from 'react-toastify';

export default function ProductCard({ productData, column }) {
  var { cartItems, setCartItems } = useContext(cartContext);

  const addTocart = (product) => {

    var cartCheck = cartItems.filter((v) => {
      if (product.id == v.id) {
        return v;
      }

    });

    if (cartCheck.length == 0) {
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }


      const finalData = [productData, ...cartItems];
      setCartItems(finalData);
      toast.success('Add to cart successfully !!');
      localStorage.setItem('cartItems', JSON.stringify(finalData));
    } else {
      var cartNewData = cartItems.map((v) => {
        if (product.id == v.id) {
          v.quantity++;
          return v;
        } else {
          return v;
        }
      });

      var finalData=[...cartNewData];
      setCartItems(finalData);
      toast.success('Update cart successfully !!');
      localStorage.setItem('cartItems', JSON.stringify(finalData));
    }

  }
  return (
    <>
      <div className={(column == 4) ? 'col-md-4' : 'col-md-3'}>
        <div className="card mb-3">
          <img className="card-img-top" src={productData.image} alt="Card image cap" />
          <div className="card-body text-center">
            <p className="card-text p-3">
              <a href={`/product-details/${productData.id}`} className="text-dark">{productData.name}</a></p>
            <h4 className="pb-0 pt-0">${productData.price}</h4>
            <button className='btn btn-primary' onClick={() => addTocart(productData)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}