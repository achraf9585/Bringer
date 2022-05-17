import React , {Fragment} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../Components/MetaData'
import Header from '../Components/Header'
import Loader from '../Components/Loader'
const profile = () => {
    const { user, loading} = useSelector(state => state.auth)

  return (
<Fragment>
    {loading ? <Loader/> :(
        <Fragment>
              <Header/>
          <br/>
          <br/>  <br/>  <br/>  <br/>
          <MetaData title={'Your Profile'}  />
            <div className="card radius-10" style={{ marginLeft: '160px' }}>
                <div className="card-body">
                  <h5 className="mb-3"> Profile</h5>
                  <div className="mb-4 d-flex flex-column gap-3 align-items-center justify-content-center">
                    <div className="user-change-photo shadow">
                      <img src={user.avatar &&  user.avatar.url} alt={user.firstName+ ' '+ user.lastName}/>
                    </div>
                    <button type="button" className="btn btn-outline-dark btn-sm radius-30 px-4"><ion-icon name="image-sharp"></ion-icon>Change Photo</button>
                  </div>
                  <h5 className="mb-0 mt-4">User Information</h5>
                  <hr/>
                  <div className="row g-3">
                    <div className="col-6">
                       <label className="form-label">Username</label>
                       <p className="form-control"> {user.username} </p>
                    </div>
                    <div className="col-6">
                     <label className="form-label">Email address</label>
                     <p className="form-control"> {user.email} </p>
                   </div>
                     <div className="col-6">
                       <label className="form-label">First Name</label>
                       <p className="form-control"> {user.firstName} </p>
                   </div>
                   <div className="col-6">
                       <label className="form-label">Last Name</label>
                       <p className="form-control"> {user.lastName} </p>
                   </div>
                   <div className="col-6">
                       <label className="form-label">Joined on</label>
                       <p className="form-control"> {String(user.createdAt).substring(0,10) } </p>
                   </div>
                   <div className="col-6">
                   <label className="form-label">phone Number </label>

                   <p className="form-control"> {user.phoneNumber} </p>
                   </div>
                   <div className="col-6">
                   <Link to={'/password/update'} className=" form-control btn btn-primary px-5 radius-30">Change password</Link>
                  </div>
                  <div className="col-6">
                  <Link to={'/me/update'} className=" form-control  btn btn-danger px-5 radius-30">Edit Profile</Link>
                  </div>
                 </div>
    
               
              
            
                </div>
               
              </div>
        
             </Fragment>
    ) }
</Fragment>
  )
}

export default profile