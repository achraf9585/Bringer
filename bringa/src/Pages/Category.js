import React, { Fragment, useEffect } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import MetaData from '../Components/MetaData'
import {useDispatch, useSelector, } from 'react-redux'
import { getCategories, deleteCategory} from '../actions/categoryActions'
import { Link, Navig } from 'react-router-dom'
import Loader from '../Components/Loader'
import '../App.css'
import { useAlert } from 'react-alert'
import NewCategory from './NewCategory'
import { useNavigate } from 'react-router'
import { DELETE_CATEGORIES_RESET } from '../constants/categoryConstants'

const Category = () => {

  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  {loading, categoriess , error, categoryCount } = useSelector(state => state.categories)
  const { error : deleteError, isDeleted} = useSelector( state => state.category)
  useEffect(() => {
      dispatch(getCategories())

       if(error){
          alert.error(error)
       }
       if(deleteError){
        alert.error(deleteError)
     }
     if(isDeleted){
       alert.success('Category is deleted successfully')
      navigate('/categorie')
      dispatch({ type: DELETE_CATEGORIES_RESET})
     }
  },[dispatch, alert,error, deleteError, isDeleted])


  const deleteCategoryHandler = ( id) => {
    dispatch(deleteCategory(id))
  }
  return (
      <>
        <MetaData title={'Catégorie Boutique '} />

      <Header />
      {loading? <Loader /> : (
        <Fragment>
  
    <div className="page-content" style={{marginLeft:'170px'}}>

  
   <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
     <div className="breadcrumb-title pe-3">Tables</div>
     <div className="ps-3">
       <nav aria-label="breadcrumb">
         <ol className="breadcrumb mb-0 p-0 align-items-center">
           <li className="breadcrumb-item"><a href="javascript:;"><ion-icon name="home-outline"></ion-icon></a>
           </li>
           <li className="breadcrumb-item active" aria-current="page">Catégories</li>
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
          <h5 className="mb-0">Catégories</h5>
          <div className="row">
           <div className="col col-lg-12">
             <div className="card radius-10">
               <div className="card-body">
            <br/>
                 <div className="row row-cols-auto g-3">
                   <div className="col">
                     <Link to={'/categorie/add'} type="button" className="btn btn-primary" >Ajouter Catégorie</Link>
                    
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
        
              <th>Actions</th>
             </tr>
           </thead>
           <tbody>
               {categoriess && categoriess.map(category =>(
                  <tr>
                       <td>{category._id}</td>
                     <td>
                       <div className="d-flex align-items-center gap-3 cursor-pointer">
                          <img src="https://via.placeholder.com/110X110/212529/fff" className="rounded-circle" width="44" height="44" alt=""/>
                          <div className="">
                            <p className="mb-0">{category.name}</p>
                          </div>
                       </div>
                     </td>
                   
                     <td>
                       <div className="table-actions d-flex align-items-center gap-3 fs-6">
                         <Link to={`/categorie/${category._id}`} className="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Views" aria-label="Views"><i className="bi bi-eye-fill"></i></Link>
                         <Link to={`/categorie/update/${category._id}`} className="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Edit" aria-label="Edit"><i className="bi bi-pencil-fill"></i></Link>
                         <a onClick={() => deleteCategoryHandler(category._id)} href="javascript:;" className="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Delete" aria-label="Delete"><i className="bi bi-trash-fill"></i></a>
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
      )}
    
 </>
  )
}

export default Category