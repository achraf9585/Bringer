import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import MetaData from '../Components/MetaData'
import {useDispatch, useSelector, } from 'react-redux'
import { getCategories , newCategory} from '../actions/categoryActions'
import { Link } from 'react-router-dom'
import '../App.css'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router'
import { NEW_CATEGORIES_REQUEST, NEW_CATEGORIES_RESET, NEW_CATEGORIES_SUCCESS } from '../constants/categoryConstants'


const NewCategory = () => {
  const dispatch = useDispatch()

    const [name, setName] = useState('')
    const navigate = useNavigate()
    const alert = useAlert()
    const { loading, error, success } = useSelector(state => state.newCategory)
    useEffect(() => {
  
         if(error){
            alert.error(error)
         }
         if(success){
             navigate('/categorie')
             alert.success('Category added !')
             dispatch( { 
                 type: NEW_CATEGORIES_RESET,

             })

         }
    },[dispatch, alert,error, success])
    const submitHandler = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.set('name',name)
      dispatch(newCategory(formData))
    }
  return (
    <Fragment>
      <Header/>
      <br/>   <br/>   <br/>   <br/>   <br/>
 





                     <div class="row">
            <div class="col-xl-8 mx-auto">
            
              <div class="card">
                <div class="card-body">
                  <div class="border p-3 rounded">
                  <h6 class="mb-0 text-uppercase">Ajouter Catégorie</h6>
                  <hr/>
                  <form class="row g-3" onSubmit={submitHandler}>
                    <div class="col-12">
                      <label class="form-label" >Libélé Catégorie </label>
                      <input type="text" class="form-control" value={name} onChange={(e) =>setName(e.target.value)} required/>
                    </div>
                 
                
                    <div class="col-12">
                      <div class="d-grid">
                        <button type="submit"   disabled={loading? true: false} class="btn btn-primary">Engregister </button>
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

export default NewCategory