import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import { forgotPassword, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

const ForgotPassword = () => {
    const alert = useAlert();
    const navigate = useNavigate()
      const [email, setEmail] = useState('')
      const dispatch = useDispatch()
      const { error , loading,message } = useSelector(state =>state.forgotPassword)
      useEffect(() => {
     

        if(error ){
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message){
            alert.success(message)
          
        }
}, [dispatch, alert, message, error])

const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('email', email)



    dispatch(forgotPassword(formData))
}
  return (
    <Fragment>
<MetaData title={'Forgot password'} />
<div className="row">
        <div className="col-xl-5 col-lg-6 col-md-7 mx-auto">
          <div className="reset-passowrd">
            <div className="card radius-10 w-100 mt-8">
              <div className="card-body p-4">
                <div className="text-center">
                  <h4>Reset password</h4>
                  <p>You will receive an e-mail in maximum 60 seconds</p>
                </div>
                <form className="form-body row g-3" onSubmit={submitHandler}>
                  <div className="col-12">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={ email } />
                  </div>
               
                  <div className="col-12 col-lg-12">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-dark" disabled={loading ? true :false}>Updatte Password</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </Fragment>
  )
}

export default ForgotPassword