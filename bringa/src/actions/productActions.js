import axios from 'axios'

import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,
    ALL_PRODUCTS_DETAILS_FAILED,ALL_PRODUCTS_DETAILS_SUCCESS,ALL_PRODUCTS_DETAILS_REQUEST, NEW_PRODUCTS_REQUEST, NEW_PRODUCTS_SUCCESS, NEW_PRODUCTS_FAILED,
    DELETE_PRODUCTS_FAILED,DELETE_PRODUCTS_REQUEST,DELETE_PRODUCTS_RESET,DELETE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAILED,UPDATE_PRODUCTS_REQUEST,UPDATE_PRODUCTS_RESET,UPDATE_PRODUCTS_SUCCESS,

} from '../constants/productConstants'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({type:  ALL_PRODUCTS_REQUEST })
        const {data} = await axios.get('/api/v1/products')
        dispatch({ 
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAILED,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type:  ALL_PRODUCTS_DETAILS_REQUEST })
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({ 
            type: ALL_PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_DETAILS_FAILED,
            payload: error.response.data.message
        })
    }
}

// new product
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type: NEW_PRODUCTS_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/product/new' , productData, config)    
        dispatch({
            type: NEW_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCTS_FAILED,
            payload: error.response.data.message
        })
    }
}



// delete product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_PRODUCTS_REQUEST})
     
        const { data } = await axios.delete(`/api/v1/product/delete/${id}` )    
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCTS_FAILED,
            payload: error.response.data.message
        })
    }
}



// update product 
export const updateProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCTS_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/product/update/${id}`, productData, config)    
        dispatch({
            type: UPDATE_PRODUCTS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCTS_FAILED,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}