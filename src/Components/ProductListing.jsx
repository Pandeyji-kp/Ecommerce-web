import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from './ProductCard';

export default function ProductListing() {

  const params = useParams();

  const [filterBrand, setFilterBrand] = useState([]);

  useEffect(() => {
    if (params.slug != undefined) {
      var slug = [params.slug];
      setFilterBrand(slug)
    } else {
      var slug = [];
      setFilterBrand([])
    }
  }, [params.slug]);

  const [filterCategory, setfilterCategory] = useState([]);

  useEffect(() => {
    if (params.slug != undefined) {
      var slug = [params.slug];
      setfilterCategory(slug)
    } else {
      var slug = [];
      setfilterCategory([])
    }
  }, [params.slug]);





  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/categories.php')
      .then((response) => {
        setCategories(response.data.data)
      })
      .catch((error) => {
        toast.error('Something went wrong !!');
      });
  }, []);




  const [brands, setBrands] = useState([]);
  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/brands.php')
      .then((response) => {
        setBrands(response.data.data)
      })
      .catch((error) => {
        toast.error('Something went wrong !!');
      });
  }, []);

  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [name, setName] = useState('');
  const [discountFrom, setDiscountFrom] = useState('');
  const [discountTo, setDscountTo] = useState('');


  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params: {
        page: page,
        limit: 18,
        sorting: sorting,
        name: name,
        price_from: priceFrom,
        price_to: priceTo,
        discount_from: discountFrom,
        discount_to: discountTo,
        ratings: '',
        brands: filterBrand.toString(),
        categories: filterCategory.toString(),
      }
    })
      .then((response) => {
        setProducts(response.data.data)
      })
      .catch((error) => {

      })
  }, [page, sorting, filterCategory, priceFrom, priceTo, name, filterBrand]);


  const filterSorting = (value) => {
    setSorting(value);
  }


  const filterCategories = (slug) => {

    if (filterCategory.includes(slug)) {
      var data = filterCategory.filter((v, i) => {
        if (v != slug) {
          return v;
        }
      })

      const finalData = [...data];
      setfilterCategory(finalData);
    } else {
      const finalData = [...filterCategory, slug];
      setfilterCategory(finalData);

      console.log(finalData);
    }
  }



  const filterprice = (from, to) => {
    setPriceFrom(from);
    setPriceTo(to);

  }

  const filterDiscount = (from, to) => {
    setPriceFrom(from);
    setPriceTo(to);

  }

  const filterName = (event) => {
    setName(event.target.value);
  }

  const filterBrandss = (slug) => {
    if (filterBrand.includes(slug)) {
      // Remove the slug from filterBrand
      const updatedBrands = filterBrand.filter((brand) => brand !== slug);
      setFilterBrand(updatedBrands);
    } else {
      // Add the slug to filterBrand
      const updatedBrands = [...filterBrand, slug];
      setFilterBrand(updatedBrands);
    }
  };



  return (
    <>
      <div className="search-section">
        <div className="container-fluid container-xl">
          <div className="row main-content ml-md-0">
            <div className="sidebar col-md-3 px-0">
              <h1 className="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                <span className="mr-2 filter-close-btn">
                  X
                </span>
                Filters
                <span className="ml-auto text-uppercase">Reset Filters</span>
              </h1>
              <div className="sidebar__inner ">
                <div className="filter-body">
                  <div>
                    <h2 className="border-bottom pb-3 filter-title">Categories</h2>
                    <div className="mb-30 filter-options">
                      {/* <div id="wrapper">
                        <div class="scrollbar" id="style-default">
                          <div class="force-overflow"> */}

                            {
                              categories.map((v, i) => {
                                return (
                                  <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id={v.slug} defaultChecked={(filterCategory.includes(v.slug)) ? 'checked' : ''} onClick={() => filterCategories(v.slug)} />
                                    <label className="custom-control-label ps-2" htmlFor={v.slug}>{v.name}</label>
                                  </div>
                                )
                              })
                            }
                          {/* </div>
                        </div>
                      </div> */}
                    </div>

                    <h2 className="border-bottom pb-3 filter-title">Brands</h2>
                    <div className="mb-30 filter-options">
                      {
                        brands.map((v, i) => (
                          <div className="custom-control custom-checkbox mb-3" key={i}>
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={v.slug}
                              checked={filterBrand.includes(v.slug)}
                              onChange={() => filterBrandss(v.slug)}
                            />
                            <label className="custom-control-label ps-2" htmlFor={v.slug}>
                              {v.name}
                            </label>
                          </div>
                        ))
                      }
                    </div>


                    {/* <!--seating option end--> */}
                    <h2 className="font-xbold body-font border-bottom filter-title">Price Range</h2>
                    <div className="mb-3 filter-options" id="cusine-options">
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="0-250" onClick={() => filterprice(0, 250)} />
                        <label className="custom-control-label ms-2 " htmlFor="0-250">0-250</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="251-500" onClick={() => filterprice(251, 500)} />
                        <label className="custom-control-label ms-2" htmlFor="251-500">251-500</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="15%" onClick={() => filterprice(501, 750)} />
                        <label className="custom-control-label ms-2" htmlFor="501-750">501-750</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="751-1000" onClick={() => filterprice(751, 1000)} />
                        <label className="custom-control-label ms-2" htmlFor="751-1000">751-1000</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="1001-1500" onClick={() => filterprice(1001, 1500)} />
                        <label className="custom-control-label ms-2" htmlFor="1001-1500">1001-1500</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='price' className="custom-control-input" id="1501-2500" onClick={() => filterprice(1501, 2500)} />
                        <label className="custom-control-label ms-2" htmlFor="1501-2500">1501-2500</label>
                      </div>
                    </div>

                    {/* <!-- cusine filters end --> */}
                    <h2 className="font-xbold body-font border-bottom filter-title">Discount Range</h2>
                    <div className="mb-3 filter-options" id="cusine-options">
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='Discount' className="custom-control-input" id="5%" onClick={() => filterDiscount(5)} />
                        <label className="custom-control-label ms-2 " htmlFor="5%">5% and above</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='Discount' className="custom-control-input" id="10%" onClick={() => filterDiscount(10)} />
                        <label className="custom-control-label ms-2" htmlFor="10%">10% and above</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='Discount' className="custom-control-input" id="15%" onClick={() => filterDiscount(15)} />
                        <label className="custom-control-label ms-2" htmlFor="15%">15% and above</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="radio" name='Discount' className="custom-control-input" id="20%" onClick={() => filterDiscount(20)} />
                        <label className="custom-control-label ms-2" htmlFor="20%">20% and above</label>
                      </div>
                    </div>
                    <h2 className="border-bottom filter-title">Services</h2>
                    <div className="mb-3 filter-options" id="services-options">
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="Breakfast" defaultChecked />
                        <label className="custom-control-label" htmlFor="Breakfast">Breakfast</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="other" />
                        <label className="custom-control-label" htmlFor="other">Other</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content col-md-9">
              <div className="d-flex justify-content-between border-bottom align-items-center mb-3">
                <h2 className="title">Products</h2>

                <input type="text" name='product_name' onKeyUp={filterName} />
                <div className="filters-actions">
                  <div>
                    <button className="btn filter-btn d-md-none"><svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                      Filter</button>
                  </div>
                  <div className="d-flex align-items-center">

                    <div className="dropdown position-relative sort-drop">
                      <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Product Filter
                      </button>
                      <div className="dropdown-menu dropdown-menu-right p-0 no-caret">

                        {/* selected */}
                        <a className="dropdown-item" onClick={() => filterSorting(1)} href="javascript:void(0)">Name ASC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(2)} href="javascript:void(0)">Name DESC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(3)} href="javascript:void(0)">Price ASC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(4)} href="javascript:void(0)">Price DESC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(5)} href="javascript:void(0)">Discounted Price ASC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(6)} href="javascript:void(0)">Discounted DESC</a>
                        <a className="dropdown-item" onClick={() => filterSorting(7)} href="javascript:void(0)">Rating Low to High</a>
                        <a className="dropdown-item" onClick={() => filterSorting(8)} href="javascript:void(0)">Rating High to Low</a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row row-grid ">
                {
                  products.map((v, i) => {
                    return (
                      <ProductCard key={i} productData={v} column={4} />
                    )
                  })
                }
                {/* <div className="col-md-6 col-lg-4 col-xl-4">
                  <img src="https://dummyimage.com/300X400/000/fff" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}