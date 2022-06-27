import React, { Fragment, useEffect } from 'react'
import Footer from '../../../Components/Footer'
import axios from 'axios';

import Header from '../../../Components/Header'
import MetaData from '../../../Components/MetaData'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import '../../../App.css'
import { useAlert } from 'react-alert'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { getProducts, deleteProduct } from '../../../actions/productActions'
import { getCategoryDetails } from '../../../actions/categoryActions'
import { DELETE_PRODUCTS_REQUEST } from '../../../constants/productConstants';

const Products = () => {

  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  {loading, productss , error, productCount } = useSelector(state => state.products)

  const { l , e , category } = useSelector(state => state.categoryDetails)
  const { error : deleteError, isDeleted} = useSelector( state => state.product)

console.log(productss)
  useEffect(() => {
      dispatch(getProducts())
      if(error){
        alert.error(error)
     }
     if(deleteError){
      alert.error(deleteError)
   }
   if(isDeleted){
     alert.success('Product is deleted successfully')
    navigate('/produits')
    dispatch({ type: DELETE_PRODUCTS_REQUEST})
   }
  } , [dispatch,  alert,error, deleteError, isDeleted])

  const deleteProductHandler = ( id) => {
    dispatch(deleteProduct(id))
  }
  
  return (
      <>
        <MetaData title={'Produit Boutique '} />
        <Fragment>
  
  <div className="page-content" style={{marginLeft:'170px'}}>


 <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
   <div className="breadcrumb-title pe-3">Tables</div>
   <div className="ps-3">
     <nav aria-label="breadcrumb">
       <ol className="breadcrumb mb-0 p-0 align-items-center">
         <li className="breadcrumb-item"><a href="javascript:;"><ion-icon name="home-outline"></ion-icon></a>
         </li>
         <li className="breadcrumb-item active" aria-current="page">Produits</li>
       </ol>
     </nav>
   </div>
   <div className="ms-auto">
     <div className="btn-group">
       <button type="button" className="btn btn-outline-primary">Settings</button>
       <button type="button" className="btn btn-outline-primary split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">	<span className="visually-hidden">Toggle Dropdown</span>
       </button>
       <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	<a className="dropdown-item" href="javascript:;">Action</a>
         <a className="dropdown-item" href="javascript:;">Another action</a>
         <a className="dropdown-item" href="javascript:;">Something else here</a>
         <div className="dropdown-divider"></div>	<a className="dropdown-item" href="javascript:;">Separated link</a>
       </div>
     </div>
   </div>
 </div>



 <div className="card">
   <div className="card-body">
     <div className="d-flex align-items-center">
        <h5 className="mb-0">Produits</h5>
        <div className="row">
         <div className="col col-lg-12">
           <div className="card radius-10">
             <div className="card-body">
          <br/>
               <div className="row row-cols-auto g-3">
                 <div className="col">
                   <Link to={'/produit/add'} type="button" className="btn btn-primary" >Ajouter Produit</Link>
                  
                 </div>
                 <div className="col">
             
                 </div>
                
                 
             
               
               </div>
            
             </div>
           </div>
        
         </div>
       </div>
         <form className="ms-auto position-relative">
           <div className="position-absolute top-50 translate-middle-y search-icon px-3"><ion-icon name="search-sharp"></ion-icon></div>
           <input className="form-control ps-5" type="text" placeholder="search"/>
         </form>
     </div>
     <div className="table-responsive mt-3">
       <table className="table align-middle">
         <thead className="table-secondary">
           <tr>
            <th>#</th>
            <th>Libélé</th>
            <th> Description</th>
            <th> Catégorie</th>
            <th>Prix</th>
            <th>Actions</th>
           </tr>
         </thead>
         <tbody>
             {productss && productss.map(product =>(
                <tr>
                     <td>{product._id}</td>
                   <td>
                    <div className="d-flex align-items-center gap-3 cursor-pointer">
                        <img src={product.images &&  product.images[0].url} className="rounded-circle" width="44" height="44" alt=""/>
                        <div className="">
                          <p className="mb-0">{product.name}</p>
                        </div>
                     </div>
                   </td>
                   <td>{product.description}</td>

                    <td>{product.category.name}</td>
        
                   
             
                   <td>{product.price} TND</td>


                   <td>
                     <div className="table-actions d-flex align-items-center gap-3 fs-6">
                       <Link to={`/produit/${product._id}`} className="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Views" aria-label="Views"><i className="bi bi-eye-fill"></i></Link>
                       <Link to={`/produit/update/${product._id}`} className="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit" aria-label="Edit"><i className="bi bi-pencil-fill"></i></Link>
                       <a onClick={() => deleteProductHandler(product._id)}  href="javascript:;" className="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Delete" aria-label="Delete"><i className="bi bi-trash-fill"></i></a>
                     </div>
                   </td>
                </tr>
                 
             ))}
       
         </tbody>
       </table>
     </div>
   </div>
 </div>






</div>
<Footer/>
      </Fragment>
      <Header />
  
    
 </>
  )
}

export default Products