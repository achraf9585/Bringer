import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {categoryReducer, newCategoryReducer,    categoryDetailsReducer , duCategoryReducer} from './reducers/categoryReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'

const reducer =  combineReducers({
 categories: categoryReducer,
 categoryDetails: categoryDetailsReducer,
 auth: authReducer,
 user: userReducer,
 forgotPassword: forgotPasswordReducer,
 newCategory: newCategoryReducer,
 category: duCategoryReducer,
})

let initialState = {}

const middleware  = [thunk]
const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store 