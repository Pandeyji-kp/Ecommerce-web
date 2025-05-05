import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetail() {



  const params = useParams();

  console.log(params);

  const [productDetails, setProductDetails] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [multipleImages, setMultipleImages] = useState([]);

  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/productdetails.php?id=${params.id}`)
      .then((response) => {
        setProductDetails(response.data.product)
        setCurrentImage(response.data.product.multiple_images[0])
        setMultipleImages(response.data.product.multiple_images)
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
  }, []);

  const changeImage=(image)=>{
    setCurrentImage(image);
  }

  return (
    <>
      <div className="container my-5">
        <div className="row details-snippet1">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-2 mini-preview">
                {
                  (productDetails != '') 

                  ?
                  multipleImages.map((v, i) => {
                    return (
                      <img className="img-fluid" src={v} onClick={()=>changeImage(v)} alt="Preview" />
                    )
                  })
                  :
                  ''
                }

              </div>
              <div className="col-md-10">
                <div className="product-image">
                {
                  (productDetails != '') 

                  ?
                  <img className="img-fluid" src={currentImage} alt="Main Image" />
                  :
                  ''
                }
                </div>

              </div>
            </div>

          </div>
          <div className="col-md-5">
            <div className="category"><span className="theme-text">Category:</span> {productDetails.category}</div>
            <div className="title">{productDetails.name}</div>
            <div className="ratings my-2">
              <div className="stars d-flex">
                <div className="theme-text mr-2">{productDetails.rating} </div>
                <div>&#9733;</div>
                <div>&#9733;</div>
                <div>&#9733;</div>
                <div>&#9733;</div>
                <div>&#9733;</div>
                <div className="ml-2"></div>
              </div>
            </div>
            <div className="price my-2">${productDetails.price} <strike className="original-price">${productDetails.discount_percentage}</strike></div>
            <div className="theme-text subtitle">{productDetails.description}</div>
            <div className="brief-description">

            </div>

            {/* <!-- TO REMOVE COLORS --> */}
            <div>
              <div className="subtitle my-3 theme-text">Colors:</div>
              <div className="select-colors d-flex">
                <div className="color red"></div>
                <div className="color silver"></div>
                <div className="color black"></div>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-md-3">
                <input type="number" className="form-control" value="1" />
              </div>
              <div className="col-md-9"><button className="btn addBtn btn-block">Add to basket</button></div>
            </div>

          </div>
        </div>






      </div>
    </>
  )
}