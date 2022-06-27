import React, {Fragment, useEffect, } from 'react'
import Footer from '../../../Components/Footer'
import Header from '../../../Components/Header'
import MetaData from '../../../Components/MetaData'
import  {useDispatch, useSelector} from 'react-redux' 
import {getProductDetails, clearErrors} from '../../../actions/productActions'
import {useAlert} from 'react-alert'
import Loader from '../../../Components/Loader'
import {useParams} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading , error , product } = useSelector(state => state.productDetails)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getProductDetails(id))    
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error,id])
  return (
    <Fragment>
<MetaData title={'Details produits '} />
    {loading? <Loader /> : (
        <Fragment>
      
        <Header/>
        <br/>
        <br/>  <br/>  <br/>  <br/>
      <div className="shop-container" style={{ marginLeft: '150px' }}>
  
        <div className="card shadow-sm border-0">
          <div className="card-body">
             
            <div className="product-detail-card">
              <div className="product-detail-body">
                <div className="row g-0">
                  <div className="col-12 col-lg-5">
                    <Carousel pause='hover'>
                    {product.images && product.images.map( img => (
                        <Carousel.Item key={img.public_id}>
                           <img src={img.url} class="d-block w-100" alt={product.name} />
                        </Carousel.Item>
                ))}
                
                    </Carousel>
                
                  </div>
                  <div className="col-12 col-lg-7">
                    <div className="product-info-section p-3">
                      <h3 className="mt-3 mt-lg-0 mb-0">{product.name}</h3>

                      <div className="product-rating d-flex align-items-center mt-2">
                        <div className="rates cursor-pointer font-13">	<i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-light-4"></i>
                        </div>
                        <div className="ms-1">
                          <p className="mb-0">(24 Ratings)</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3 gap-2">
                       
                        <h4 className="mb-0">{product.price} DT</h4>
                      </div>
                      <div className="mt-3">
                        <h6>Discription :</h6>
                        <p className="mb-0">{product.description}
  
                        </p>
                      </div>
                      <dl className="row mt-3">	<dt className="col-sm-3">Product id</dt>
                        <dd className="col-sm-9">{product._id}</dd>	<dt className="col-sm-3"/>
                      </dl>
                 
                
             
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
  
        
    
             
            
          </div>
        </div>
                  
              </div>
          <Footer/>
  
        </Fragment>
    )}
   </Fragment>
  )
}

export default ProductDetails