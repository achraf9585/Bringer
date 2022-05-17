import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import { updatePassword, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { Link } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router'

const UpdatePassword = ({ history}) => {
    const alert = useAlert();
    const navigate = useNavigate()
      const [oldPassword, setOldPassword] = useState('')
      const [newPassword, setNewPassword] = useState('')
      const dispatch = useDispatch()
      const { error , isUpdated, loading } = useSelector(state =>state.user)
      useEffect(() => {
     

        if(error ){
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated){
            alert.success('Password updated successfully !!!')
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
}, [dispatch, alert, isUpdated , error, history])

const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('oldPassword', oldPassword)
    formData.set('newPassword', newPassword)



    dispatch(updatePassword(formData))
}

  return (
   <Fragment>
       <MetaData title={'Change Password'} />
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
                    <label for="inputEmail" className="form-label">Old Password</label>
                    <input type="password" className="form-control" id="inputEmail" 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    value={ oldPassword } />
                  </div>
                  <div className="col-12">
                    <label for="inputEmail1" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="inputEmail1"
                       onChange={(e) => setNewPassword(e.target.value)} 
                       value={ newPassword } />
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

export default UpdatePassword