import { 
    ALL_CATEGORIES_REQUEST , 
    ALL_CATEGORIES_SUCCESS  , 
    ALL_CATEGORIES_FAILED, 
    ALL_CATEGORIES_DETAILS_SUCCESS,
    ALL_CATEGORIES_DETAILS_REQUEST,
    ALL_CATEGORIES_DETAILS_FAILED,
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

export const categoryReducer  = (state = {categories:[] }, action) => {
    switch(action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                loading: true,
                categories: []
            }
        case ALL_CATEGORIES_SUCCESS:
                return {
                    loading: false,
                    categories: action.payload.categories,
                    categoryCount:action.payload.categoryCount ,
                    categoriess:action.payload.categoriess 

                }
                case ALL_CATEGORIES_FAILED:
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


// new category 

export const newCategoryReducer = (state = {category:  {}}, action) => {
    switch (action.type) {
        case NEW_CATEGORIES_REQUEST: 
        return {
            ...state,
            loading: true,
        }
        case NEW_CATEGORIES_SUCCESS: 
        return {
            loading: false,
            success: action.payload.success,
            category: action.payload.category
        }
        case NEW_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case NEW_CATEGORIES_RESET:
            return {
                ...state,
                error: null
            }
        default:
            return state    
    }
}

export const categoryDetailsReducer = (state = {category : {} } ,action) =>{
    switch(action.type) {
        case ALL_CATEGORIES_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                
            }
            case ALL_CATEGORIES_DETAILS_SUCCESS:
                return {
                
                    loading: false,
                    category: action.payload
                }
                case ALL_CATEGORIES_DETAILS_FAILED:
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



export const duCategoryReducer = (state = {category:  {}}, action) => {
    switch (action.type) {
        case DELETE_CATEGORIES_REQUEST: 
        case UPDATE_CATEGORIES_REQUEST:
        return {
            ...state,
            loading: true,
        }
        case DELETE_CATEGORIES_SUCCESS: 
        return {
            ...state,  
            loading: false,
            isDeleted: action.payload,
        }
        case  UPDATE_CATEGORIES_SUCCESS: 
        return {
            ...state,  
            loading: false,
            isUpdated: action.payload,
        }
        case DELETE_CATEGORIES_FAILED:
        case UPDATE_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_CATEGORIES_RESET:
            return {
                ...state,
                isDeleted: false
            }
            case UPDATE_CATEGORIES_RESET:
                return {
                    ...state,
                    isUpdated: false
                }    
        default:
            return state    
    }
}