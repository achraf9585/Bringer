import React, {Fragment} from 'react'
import {Route, Navigate , Routes, Outlet} from 'react-router-dom'
import { useSelector} from 'react-redux'


function  ProtectedRoute ()  {
    
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
        
      return ( <>
     {loading === false && (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
      )}
       </>
      )
 
        

}

export default ProtectedRoute