import axios from 'axios'
import { 
    ALL_CATEGORIES_REQUEST , 
    ALL_CATEGORIES_SUCCESS  , 
    ALL_CATEGORIES_FAILED, 
    ALL_CATEGORIES_DETAILS_FAILED,
    ALL_CATEGORIES_DETAILS_REQUEST,
    ALL_CATEGORIES_DETAILS_SUCCESS,
    NEW_CATEGORIES_FAILED,
    NEW_CATEGORIES_REQUEST,
    NEW_CATEGORIES_RESET,
    NEW_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILED,
    DELETE_CATEGORIES_REQUEST,
    DELETE_CATEGORIES_RESET,
    DELETE_CATEGORIES_SUCCESS,
    UPDATE_CATEGORIES_FAILED,
    UPDATE_CATEGORIES_REQUEST,
    UPDATE_CATEGORIES_RESET,
    UPDATE_CATEGORIES_SUCCESS,
    
    CLEAR_ERRORS} from '../constants/categoryConstants'

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({type:  ALL_CATEGORIES_REQUEST })
        const {data} = await axios.get('/api/v1/categories')
        dispatch({ 
            type: ALL_CATEGORIES_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAILED,
            payload: error.response.data.message
        })
    }
}


export const newCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({type: NEW_CATEGORIES_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/category/new' , categoryData, config)    
        dispatch({
            type: NEW_CATEGORIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORIES_FAILED,
            payload: error.response.data.message
        })
    }
}

// update category 
export const updateCategory = (id,categoryData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_CATEGORIES_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/category/update/${id}`, categoryData, config)    
        dispatch({
            type: UPDATE_CATEGORIES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORIES_FAILED,
            payload: error.response.data.message
        })
    }
}

export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({type:  ALL_CATEGORIES_DETAILS_REQUEST })
        const {data} = await axios.get(`/api/v1/category/${id}`)
        dispatch({ 
            type: ALL_CATEGORIES_DETAILS_SUCCESS,
            payload: data.category
        })
        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_DETAILS_FAILED,
            payload: error.response.data.message
        })
    }
}

// delete category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_CATEGORIES_REQUEST})
     
        const { data } = await axios.delete(`/api/v1/category/delete/${id}` )    
        dispatch({
            type: DELETE_CATEGORIES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORIES_FAILED,
            payload: error.response.data.message
        })
    }
}

// clear errors 

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}