import React, {Fragment, useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import  {useDispatch, useSelector} from 'react-redux' 
import { updateProfile, loadUser, clearErrors} from '../actions/userActions'
import MetaData from '../Components/MetaData'
import { Link } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router'


const UpdateProfile = ({ history}) => {
  const alert = useAlert();
  const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('boutique/assets/persons/avatardefault_92824.png')

    const { user } = useSelector(state => state.auth )
    const { error , isUpdated, loading } = useSelector(state =>state.user)
    useEffect(() => {
            if(user){
                setUsername(user.username)
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
                setPhoneNumber(user.phoneNumber)

                setAvatarPreview(user.avatar.ur)
            }

            if(error ){
                alert.error(error)
                dispatch(clearErrors())
            }
            if (isUpdated){
                alert.success('user updated successfully !!!')
                dispatch(loadUser());
                navigate('/me')
                dispatch({
                    type: UPDATE_PROFILE_RESET
                })
            }
    }, [dispatch, alert, isUpdated , error, history])
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('username', username)
        formData.set('phoneNumber', phoneNumber)
        formData.set('firstName', firstName)
        formData.set('lastName', lastName)
        formData.set('email', email)
        formData.set('avatar', avatar)

        dispatch(updateProfile(formData))
    }
    const onChange = e => {
    
            const reader = new FileReader() 
            reader.onload = () => {
                //readerstate = 2 means process is done
                if(reader.readyState === 2 ) {
                        setAvatarPreview(reader.result)
                        setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        
    }
  return (
    <Fragment>
        <MetaData title={'Update profile'} />
          <div className="card radius-10">
                <div className="card-body">
                  <form onSubmit={ submitHandler}>
                  <h5 className="mb-3">Edit Profile</h5>
                  <div className="mb-4 d-flex flex-column gap-3 align-items-center justify-content-center">
                    <div className="user-change-photo shadow">
                      <img src="https://via.placeholder.com/110X110/212529/fff" alt="..."/>
                    </div>
                    <input type="file" className="btn btn-outline-dark btn-sm radius-30 px-4"
                    accept='image/*'
                    onChange={onChange}
                    /><ion-icon name="image-sharp"></ion-icon>
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
                  <h5 className="mb-0 mt-4">User Information</h5>
                  <hr/>
                  <div className="row g-3">
                    <div className="col-6">
                       <label className="form-label">Username</label>
                       <input type="text" className="form-control" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       />
                    </div>
                    <div className="col-6">
                     <label className="form-label">Email address</label>
                     <input type="text" className="form-control" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                   </div>
                     <div className="col-6">
                       <label className="form-label">First Name</label>
                       <input type="text" className="form-control" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}/>
                   </div>
                   <div className="col-6">
                       <label className="form-label">Last Name</label>
                       <input type="text" className="form-control" value={lastName}
                       onChange={(e) => setLastName(e.target.value)}/>
                   </div>
                   <div className="col-6">
                   <label className="form-label">phone Number </label>

                   <input type="text" className="form-control" value={phoneNumber}
                       onChange={(e) => setPhoneNumber(e.target.value)}/>                  
                        </div>
                 </div>
    
              
                  <div className="text-start mt-3">
                    <button type="submitt" className="btn btn-dark px-4" disabled={loading ? true :false}>Save Changes</button>
                  </div>
              
               </form>
              </div>
              </div>
              

    </Fragment>
  )
}

export default UpdateProfile