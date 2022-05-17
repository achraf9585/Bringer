import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import MetaData from '../Components/MetaData'
import {useDispatch, useSelector, } from 'react-redux'
import { getCategoryDetails,clearErrors, updateCategory} from '../actions/categoryActions'
import { Link } from 'react-router-dom'
import '../App.css'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router'
import { NEW_CATEGORIES_REQUEST, NEW_CATEGORIES_RESET, NEW_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_RESET } from '../constants/categoryConstants'
import {useParams} from 'react-router-dom'

const UpdateCategory = () => {
    const [name, setName] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error, category} = useSelector(state => state.categoryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.category)
    const navigate = useNavigate()
    const {id} = useParams()




    useEffect(() => {

        if( category && category._id !== id) {
            dispatch(getCategoryDetails(id))
        }else {
            setName(category.name)
        }
    
        if(error){
            alert.error(error)
            dispatch(clearErrors())
       }
       if(updateError){
        alert.error(updateError)
        dispatch(clearErrors())
   }
       if(isUpdated){
           navigate('/categorie')
           alert.success('Category updated successfully !')
           dispatch( { 
               type: UPDATE_CATEGORIES_RESET,

           })

       }
  },[dispatch, alert,error, isUpdated, updateError, category, id])
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('name',name)
    dispatch(updateCategory(category._id,formData))
  }
    return (
        <Fragment>
            <MetaData title={'update category'} />
          <Header/>
          <br/>   <br/>   <br/>   <br/>   <br/>
     
    
    
    
    
    
                         <div class="row">
                <div class="col-xl-8 mx-auto">
                
                  <div class="card">
                    <div class="card-body">
                      <div class="border p-3 rounded">
                      <h6 class="mb-0 text-uppercase">Modifier Catégorie</h6>
                      <hr/>
                      <form class="row g-3" onSubmit={submitHandler}>
                        <div class="col-12">
                          <label class="form-label" >Libélé Catégorie </label>
                          <input type="text" class="form-control" value={name} onChange={(e) =>setName(e.target.value)} required/>
                        </div>
                     
                    
                        <div class="col-12">
                          <div class="d-grid">
                            <button type="submit"   disabled={loading? true: false} class="btn btn-primary">Modifier </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    </div>
                  </div>
      
                  
               
      
               
      
           
      
           
      
                </div>
              </div>
              <Footer/>
        </Fragment>
      )
}

export default UpdateCategory