import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import Loader from '../Components/Loader'
import { Link } from 'react-router-dom'
import { login, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { useNavigate } from 'react-router'

const Login = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated , error, loading } = useSelector(state => state.auth )
    useEffect(() => {
            if(isAuthenticated){
              navigate('/categorie')
            }
            

            if(error ){
                alert.error(error)
                dispatch(clearErrors())
            }
    }, [dispatch, alert,  isAuthenticated, error, history])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
  return (
   <Fragment>
       {loading ? <Loader /> : (
        <Fragment>
        <MetaData title={'Login'} />
        <div class="login-bg-overlay au-sign-in-basic"></div>

        <div className="container">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto mt-5">
          <div className="card radius-10">
            <div className="card-body p-4">
              <div className="text-center">
                <h4>Sign In</h4>
                <p>Sign In to your account</p>
              </div>
              <form className="form-body row g-3" onSubmit={submitHandler}>
                <div className="col-12 col-lg-12">
                  <div className="d-grid gap-2">
                    <a href="javascript:;" className="btn border border-2 border-dark"><img
                        src="boutique/assets/images/icons/google.png" width="20" alt=""/><span className="ms-3 fw-500">Sign in with
                        Google</span></a>
                    <a href="javascript:;" className="btn border border-2 border-dark"><img
                        src="boutique/assets/images/icons/apple-black-logo.png" width="20" alt=""/><span className="ms-3 fw-500">Sign
                        in with Apple
                        </span></a>
                  </div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="position-relative border-bottom my-3">
                    <div className="position-absolute seperator-2 translate-middle-y">OR</div>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="abc@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-12">
                  <label htmlFor="inputPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckRemember"/>
                    <label className="form-check-label" for="flexSwitchCheckRemember">Remember Me</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6 text-end">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-dark">Sign In</button>
                  </div>
                </div>
                <div className="col-12 col-lg-12 text-center">
                  <p className="mb-0">Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
         </Fragment>
       )}
   </Fragment>
  )
}

export default Login