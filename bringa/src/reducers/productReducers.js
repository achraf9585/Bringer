import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,
    ALL_PRODUCTS_DETAILS_FAILED,ALL_PRODUCTS_DETAILS_SUCCESS,ALL_PRODUCTS_DETAILS_REQUEST,
    NEW_PRODUCTS_FAILED,NEW_PRODUCTS_REQUEST,NEW_PRODUCTS_RESET,NEW_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILED,DELETE_PRODUCTS_REQUEST,DELETE_PRODUCTS_RESET,DELETE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAILED,UPDATE_PRODUCTS_REQUEST,UPDATE_PRODUCTS_RESET,UPDATE_PRODUCTS_SUCCESS,

} from '../constants/productConstants'
export const productsReducer  = (state = { products:[] }, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    productCount:action.payload.productCount,
                    productss:action.payload.productss 

                }
                case ALL_PRODUCTS_FAILED:
                    return {
                        loading: false,
                        error: action.payload
                    }

        case CLEAR_ERRORS:  
        return {
            ...state,
            error: null
        }          
        default:
            return state
    }
}



export const productDetailsReducer = (state = {product : {} } ,action) =>{
    switch(action.type) {
        case ALL_PRODUCTS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                
            }
            case ALL_PRODUCTS_DETAILS_SUCCESS:
                return {
                
                    loading: false,
                    product: action.payload
                }
                case ALL_PRODUCTS_DETAILS_FAILED:
                    return {
                        ...state,
                        error: action.payload
                    }   
                    case CLEAR_ERRORS:  
                    return {
                        ...state,
                        error: null
                    }   
        default:
            return state
    }
}




// new product 

export const newProductReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case NEW_PRODUCTS_REQUEST: 
        return {
            ...state,
            loading: true,
        }
        case NEW_PRODUCTS_SUCCESS: 
        return {
            loading: false,
            success: action.payload.success,
            product: action.payload.product
        }
        case NEW_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case NEW_PRODUCTS_RESET:
            return {
                ...state,
                error: null
            }
        default:
            return state    
    }
}




export const duProductReducer = (state = {product:  {}}, action) => {
    switch (action.type) {
        case DELETE_PRODUCTS_REQUEST: 
        case UPDATE_PRODUCTS_REQUEST:
        return {
            ...state,
            loading: true,
        }
        case DELETE_PRODUCTS_SUCCESS: 
        return {
            ...state,  
            loading: false,
            isDeleted: action.payload,
        }
        case  UPDATE_PRODUCTS_SUCCESS: 
        return {
            ...state,  
            loading: false,
            isUpdated: action.payload,
        }
        case DELETE_PRODUCTS_FAILED:
        case UPDATE_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_PRODUCTS_RESET:
            return {
                ...state,
                isDeleted: false
            }
            case UPDATE_PRODUCTS_RESET:
                return {
                    ...state,
                    isUpdated: false
                }    
        default:
            return state    
    }
}