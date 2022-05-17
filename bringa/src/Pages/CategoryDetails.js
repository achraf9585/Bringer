import React, {Fragment, useEffect, } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import MetaData from '../Components/MetaData'
import  {useDispatch, useSelector} from 'react-redux' 
import {getCategoryDetails, clearErrors} from '../actions/categoryActions'
import {useAlert} from 'react-alert'
import Loader from '../Components/Loader'
import {useParams} from 'react-router-dom'


const CategoryDetails = ({ match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading , error , category } = useSelector(state => state.categoryDetails)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getCategoryDetails(id))    
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error,id])
  return (
      <Fragment>
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
                      <div className="image-zoom-section">
                        <div className="product-gallery owl-carousel owl-theme border rounded mb-3 p-3" data-slider-id="1">
                          <div className="item">
                            <img src="./boutique/assets/images/logo-icon-2.png" className="img-fluid" alt=""/>
                          </div>
                      
                        </div>
                 
                      </div>
                    </div>
                    <div className="col-12 col-lg-7">
                      <div className="product-info-section p-3">
                        <h3 className="mt-3 mt-lg-0 mb-0">{category.name}</h3>
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
                          <h5 className="mb-0 text-decoration-line-through text-light-3">9.000 DT</h5>
                          <h4 className="mb-0">7.400 DT</h4>
                        </div>
                        <div className="mt-3">
                          <h6>Discription :</h6>
                          <p className="mb-0">Double steak haché – double slice de fromage – laitue – tomates – sauce burger
    
                          </p>
                        </div>
                        <dl className="row mt-3">	<dt className="col-sm-3">Product id</dt>
                          <dd className="col-sm-9">{category._id}</dd>	<dt className="col-sm-3"/>
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

export default CategoryDetails