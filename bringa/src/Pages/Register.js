import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import { register, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { Link } from 'react-router-dom'

const Register = ( { history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [user, setUser ] = useState({
        username: '',
        phoneNumber: '',
        password: '',
        firstName: '',
        lastName:'',
        email: ''
    })
    const  {username , phoneNumber, password, firstName, lastName, email} = user
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('boutique/assets/persons/avatardefault_92824.png')

    const { isAuthentificated , error, loading } = useSelector(state => state.auth )
    useEffect(() => {
            if(isAuthentificated){
                history.push('/')
            }

            if(error ){
                alert.error(error)
                dispatch(clearErrors())
            }
    }, [dispatch, alert,  isAuthentificated, error, history])
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('username', username)
        formData.set('phoneNumber', phoneNumber)
        formData.set('password', password)
        formData.set('firstName', firstName)
        formData.set('lastName', lastName)
        formData.set('email', email)
        formData.set('avatar', avatar)

        dispatch(register(formData))
    }
    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader() 
            reader.onload = () => {
                //readerstate = 2 means process is done
                if(reader.readyState === 2 ) {
                        setAvatarPreview(reader.result)
                        setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
  return (
    <Fragment>
<MetaData title={'Inscription boutique'} />
<div className="row">
        <div className="col-xl-5 col-lg-6 col-md-7 mx-auto mt-5">
          <div className="card radius-10">
            <div className="card-body p-4">
              <div className="text-center">
                <h4>Sign Up</h4>
                <p>Creat New account</p>
              </div>
              <form className="form-body row g-3" onSubmit={submitHandler} encType='multipart/form-data'>
                <div className="col-12 col-lg-12">
                  <div className="d-grid gap-2">
                    <a href="javascript:;" className="btn border border-2 border-dark"><img
                        src="boutique/assets/images/icons/google.png" width="20" alt=""/><span className="ms-3 fw-500">Sign up with
                        Google</span></a>
                    <a href="javascript:;" className="btn border border-2 border-dark"><img
                        src="boutique/assets/images/icons/apple-black-logo.png" width="20" alt=""/><span className="ms-3 fw-500">Sign
                        up with Apple</span></a>
                  </div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="position-relative border-bottom my-3">
                    <div className="position-absolute seperator-2 translate-middle-y">OR</div>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">Username</label>
                  <input type="name"
                   className="form-control"
                   name='username'
                   value={username}
                   onChange={onChange}
                     placeholder="Your username"/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">First Name</label>
                  <input type="text" className="form-control" name='firstName' value={firstName} onChange={onChange} placeholder="Your name"/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" name='lastName' value={lastName} onChange={onChange} id="inputName" placeholder="Your name"/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">Phone Number</label>
                  <input type="text" className="form-control" name='phoneNumber' value={phoneNumber} onChange={onChange}  placeholder="Your name"/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input type="email" className="form-control"  name='email' value={email} onChange={onChange} id="inputEmail" placeholder="abc@example.com"/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputPassword" className="form-label">Password</label>
                  <input type="password" className="form-control"  name='password' value={password} onChange={onChange} id="inputPassword" placeholder="Your password"/>
                </div>

                <div className="col-12">
                    
                  <label htmlFor="avatar_upload" className="form-label">Avatar</label>
                  <div className='d-flex align-items-center'>
                      <div>
                          <figure className='avatar mr-3 item-rtl'>
                              <img src={avatarPreview}
                              className='rounded-circle'
                              style={{ width: '50px' }}
                              alt='avatar preview'/>

                          </figure>
                      </div>
                      <div className='custom-file'>
                          <input type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept='images/*'
                          onChange={onChange}
                          />
                          <label className='custom-file-label' htmlFor='customFile'>
                              choisir une image/ logo
                          </label>
                      </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                      I agree the Terms and Conditions
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-dark" disabled={loading ? true :false}>Sign Up</button>
                  </div>
                </div>
                <div className="col-12 col-lg-12 text-center">
                  <p className="mb-0">Already have an account? <Link to={'/login'} >Sign in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default Register