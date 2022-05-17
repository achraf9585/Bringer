import { useEffect, useState } from 'react';
import { BrowserRouter as  Router , Route , Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Category from './Pages/Category'
import React from 'react';
import CategoryDetails from './Pages/CategoryDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import  {loadUser} from './actions/userActions'
import store from './store'
import Profile from './Pages/profile';
import ProtectedRoute from './Components/route/ProtectedRoute';
import UpdateProfile from './Pages/UpdateProfile';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './Pages/NewPassword';
import NewCategory from './Pages/NewCategory';
import UpdateCategory from './Pages/UpdateCategory';

function App() {

    useEffect(() => {
      store.dispatch(loadUser())
    }, [])
    return(
      <div>
      
     <Router>
        <div className='container container-fluid'>
        <Routes>
          
        <Route path="/" element={<Home/>}  exact />
        <Route exact path="/login"  element={<Login/>} component={Login}  />
        <Route exact path="/register"  element={<Register/>} component={Register}  />
        <Route exact path="/password/forgot"  element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token"  element={<NewPassword/>} />

    
      
        <Route  element={<ProtectedRoute/>}>
       
        <Route exact path='/me' element={<Profile/>}/>
        <Route exact path='/me/update' element={<UpdateProfile/>}/>
        <Route exact path="/categorie/:id"  element={<CategoryDetails/>}   />
        <Route exact path="/categorie"  element={<Category/>} />
        <Route exact path="/categorie/add"  element={<NewCategory/>} />
        <Route exact path="/categorie/update/:id"  element={<UpdateCategory/>} />

        <Route exact path="/password/update"  element={<UpdatePassword/>} />


          </Route>

    
          </Routes>
         
                  </div>
     </Router>
    

    

      </div>
    )
  }



export default App;
