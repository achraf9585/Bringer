import React, { Fragment, useEffect, useState } from 'react'
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
import { getProducts, deleteProduct, newProduct } from '../../../actions/productActions'
import { NEW_PRODUCTS_RESET } from '../../../constants/productConstants';
import { read } from 'fs';

const NewProduct = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview,setImagesPreview] = useState([])
    const [categories, setCategories]  = useState([]);

const cat =  () => {
    axios.get('/api/v1/categories').then(res=>{
            console.log('Response from main API: ',res) 
            
        setCategories(res.data.categoriess)
       console.log( res.data.categoriess)
    })
}

 
    const navigate = useNavigate()
    const alert = useAlert()

    const { loading, error, success } = useSelector(state => state.newPorduct);

    useEffect(() => {
     cat()
        
        if(error){
           alert.error(error)
        }
        if(success){
            navigate('/produits')
            alert.success('Product added !')
            dispatch( { 
                type: NEW_PRODUCTS_RESET,

            })

        }
   },[dispatch, alert,error, success])
   const submitHandler = (e) => {
     e.preventDefault()
     const formData = new FormData()
     formData.set('name',name)
     formData.set('description',description)
     formData.set('price',price)
     formData.set('category',category)
    images.forEach(image => {
        formData.append('images' , image)
    })
     dispatch(newProduct(formData))
   }

   const onChange =  e => {
           const files  = Array.from(e.target.files)
           setImagesPreview([])
           setImages([])
           files.forEach(file => {
               const reader = new FileReader()
           reader.onload = () => {
               if(reader.readyState ===2){
                   setImagesPreview(oldArray => [...oldArray,reader.result])
                   setImages(oldArray => [...oldArray,reader.result])
               }
           }
           reader.readAsDataURL(file)
           })
           
           
       
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
                <h6 class="mb-0 text-uppercase">Ajouter Produit</h6>
                <hr/>
                <form class="row g-3" onSubmit={submitHandler}>
                  <div class="col-12">
                    <label class="form-label" >Libélé Produit </label>
                    <input type="text" class="form-control" value={name} onChange={(e) =>setName(e.target.value)} required/>
                  </div>
                  <div class="col-12">
                    <label class="form-label" >description </label>
                    <textarea type="text" class="form-control" value={description} onChange={(e) =>setDescription(e.target.value)} required></textarea>
                  </div>
                  <div class="col-12">
                    <label class="form-label" >Prix Produit </label>
                    <input type="text" class="form-control" value={price} onChange={(e) =>setPrice(e.target.value)} required/>
                  </div>
                  <div class="col-12">
                    <label class="form-label" >Categorie Produit </label>
<select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
     { categories && categories.map(category  => (
         <option key={category._id} value={category._id}>  {category.name} </option>
     ))}
</select>

                  </div>
                  <div class="col-12">
                  <label class="form-label" >Images Produit </label>
                  <div className='custom-file'>
                          <input type='file'
                          name='product_images'
                          className='custom-file-input'
                          id='customFile'
                          accept='images/*'
                          onChange={onChange}
                          multiple
                          />
                          <label className='custom-file-label' htmlFor='customFile'>
                              choisir une image/ logo
                          </label>
                      </div> 
                      {imagesPreview.map(img => (
                      <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height= "52"/>
                      ))}
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button type="submit"   disabled={loading ? true : false}
   class="btn btn-primary">Engregister </button>
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

export default NewProduct