import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import { resetPassword, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
const NewPassword = ( {history, match}) => {
    const alert = useAlert();
    const navigate = useNavigate()
    const { token } = useParams()
      const [passowrd, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')

      const dispatch = useDispatch()
      const { error , success} = useSelector(state =>state.forgotPassword)
      useEffect(() => {
     

        if(error ){
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success){
            alert.success('password updated successfully !')
            navigate('/login')

          
        }
}, [dispatch, alert, success,history, error])

const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('password', passowrd)
    formData.set('confirmPassword', confirmPassword)


    dispatch(resetPassword(token, formData))

}
  return (
    <Fragment>
<MetaData title={'new Password Reset'} />
<div className="row">
        <div className="col-xl-5 col-lg-6 col-md-7 mx-auto">
          <div className="reset-passowrd">
            <div className="card radius-10 w-100 mt-8">
              <div className="card-body p-4">
                <div className="text-center">
                  <h4>Reset password</h4>
                </div>
                <form className="form-body row g-3" onSubmit={submitHandler}>
                  <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label"> Password</label>
                    <input type="password" className="form-control" id="inputEmail" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={ passowrd } />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputEmail1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="inputEmail1"
                       onChange={(e) => setConfirmPassword(e.target.value)} 
                       value={ confirmPassword } />
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-dark" >Update Password</button>
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

export default NewPassword