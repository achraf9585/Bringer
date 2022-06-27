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
import { getProductDetails, updateProduct, clearErrors } from '../../../actions/productActions'
import { NEW_PRODUCTS_RESET, UPDATE_PRODUCTS_REQUEST, UPDATE_PRODUCTS_RESET } from '../../../constants/productConstants';
import { read } from 'fs';

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview,setImagesPreview] = useState([])
    const [categories, setCategories]  = useState([]);
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {error, product} = useSelector(state => state.productDetails)

    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    const cat =  () => {
        axios.get('/api/v1/categories').then(res=>{
                
            setCategories(res.data.categoriess)
        })
    }
    useEffect(() => {
        cat()
        if( product && product._id !== id) {
            dispatch(getProductDetails(id))
        }else {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setOldImages(product.images)
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
           navigate('/produits')
           alert.success('Product updated successfully !')
           dispatch( { 
               type: UPDATE_PRODUCTS_RESET,

           })

       }
  },[dispatch, alert,error, isUpdated, updateError, product, id])


  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('name',name)
    formData.set('description',description)
    formData.set('price',price)

    formData.set('category',category)
    images.forEach(image => {
        formData.append('images',image)
    })

    dispatch(updateProduct(product._id,formData))
  }

  const onChange =  e => {
    const files  = Array.from(e.target.files)
    setImagesPreview([])
    setImages([])
    setOldImages([])
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
        <MetaData title={'update Product'} />
    <Header/>
    <br/>   <br/>   <br/>   <br/>   <br/>






                   <div class="row">
          <div class="col-xl-8 mx-auto">
          
            <div class="card">
              <div class="card-body">
                <div class="border p-3 rounded">
                <h6 class="mb-0 text-uppercase">Modifier Produit</h6>
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
     { categories && categories.map(categorie  => (
         <option key={categorie._id} value={categorie._id}>  {categorie.name} </option>
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

                    {oldImages && oldImages.map(img => (
                        <img src={img.url} key={img} alt={img.url}  className='mt-3 mr-2' width="55" height= "52"/>
                    ))}

                      {imagesPreview.map(img => (
                      <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height= "52"/>
                      ))}
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button type="submit"   disabled={loading ? true : false}
   class="btn btn-primary">Modifier </button>
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

export default UpdateProduct