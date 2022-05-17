import React , {Fragment} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import  {useAlert} from 'react-alert'
import { logoutUser } from '../actions/userActions'

  const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth)
    const lougoutHandler = () => {
      dispatch(logoutUser())
      alert.success('Logged out successfully ! ')
    } 
  return (
    <Fragment>
      <aside class="sidebar-wrapper" data-simplebar="true">
      <div class="sidebar-header">
        <div>
          <img src="boutique/assets/images/logo-icon-2.png" class="logo-icon" alt="logo icon"/>
        </div>
        <div>
          <h4 class="logo-text">Blackdash</h4>
        </div>
        <div class="toggle-icon ms-auto">
          <ion-icon name="menu-sharp"></ion-icon>
        </div>
      </div>
    
      <ul class="metismenu" id="menu">
        <li>
        <li>
          <Link to={'/categorie'} >
            <div class="parent-icon">
              <i class="bi bi-basket3"></i>
            </div>
            <div class="menu-title">Catégorie</div>
          </Link>
        </li>
        <li>
          <Link to={'/produit'} >
            <div class="parent-icon">
              <i class="bx bx-restaurant"></i>
            </div>
            <div class="menu-title">Produit</div>
          </Link>
        </li>
        
   
        </li>
     

     
     
       
      
      

      

       
      
      </ul>
    
    </aside>
        <header className="top-header">
      <nav className="navbar navbar-expand gap-3">
        <div className="mobile-menu-button">
          <i className="bi bi-list"></i>
        </div>
        <form className="searchbar">
          <div className="position-absolute top-50 translate-middle-y search-icon ms-3">
            <i className="bi bi-search"></i>
          </div>
          <input className="form-control" type="text" placeholder="Search for anything"/>
          <div className="position-absolute top-50 translate-middle-y search-close-icon">
            <i className="bi bi-x-lg"></i>
          </div>
        </form>
        <div className="top-navbar-right ms-auto">

          <ul className="navbar-nav align-items-center">
            <li className="nav-item mobile-search-button">
              <a className="nav-link" href="javascript:;">
                <div className="">
                  <i className="bi bi-search"></i>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:;" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <div className="">
                  <i className="bi bi-gear"></i>
                </div>
              </a>
            </li>
            <li className="nav-item dropdown dropdown-large dropdown-apps">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="">
                  <i className="bi bi-grid"></i>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <div className="row row-cols-3 g-3 p-3">
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-basket3"></i>
                    </div>
                    <div className="app-title">Orders</div>
                  </div>
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="app-title">Teams</div>
                  </div>
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-check2-circle"></i>
                    </div>
                    <div className="app-title">Tasks</div>
                  </div>
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-cast"></i>
                    </div>
                    <div className="app-title">Media</div>
                  </div>
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-folder2-open"></i>
                    </div>
                    <div className="app-title">Files</div>
                  </div>
                  <div className="col text-center">
                    <div className="app-box mx-auto bg-dark text-white">
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>
                    <div className="app-title">Alerts</div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown dropdown-large">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="position-relative">
                  <span className="notify-badge">8</span>
                  <i className="bi bi-bell"></i>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a href="javascript:;">
                  <div className="msg-header">
                    <p className="msg-header-title">Notifications</p>
                    <p className="msg-header-clear ms-auto">Marks all as read</p>
                  </div>
                </a>
                <div className="header-notifications-list">
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-basket2"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">New Orders <span className="msg-time float-end">2 min
                            ago</span></h6>
                        <p className="msg-info">You have recived new orders</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-person"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">New Customers<span className="msg-time float-end">14 Sec
                            ago</span></h6>
                        <p className="msg-info">5 new user registered</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-file-earmark"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">24 PDF File<span className="msg-time float-end">19 min
                            ago</span></h6>
                        <p className="msg-info">The pdf files generated</p>
                      </div>
                    </div>
                  </a>

                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">New Product Approved <span className="msg-time float-end">2 hrs ago</span></h6>
                        <p className="msg-info">Your new product has approved</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-send"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">Time Response <span className="msg-time float-end">28 min
                            ago</span></h6>
                        <p className="msg-info">5.1 min avarage time response</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-chat-dots"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">New Comments <span className="msg-time float-end">4 hrs
                            ago</span></h6>
                        <p className="msg-info">New customer comments recived</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-archive"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">New 24 authors<span className="msg-time float-end">1 day
                            ago</span></h6>
                        <p className="msg-info">24 new authors joined last week</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-camera-video"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">Your item is shipped <span className="msg-time float-end">5 hrs
                            ago</span></h6>
                        <p className="msg-info">Successfully shipped your item</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="d-flex align-items-center">
                      <div className="notify">
                        <i className="bi bi-bucket"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="msg-name">Defense Alerts <span className="msg-time float-end">2 weeks
                            ago</span></h6>
                        <p className="msg-info">45% less alerts last 4 weeks</p>
                      </div>
                    </div>
                  </a>
                </div>
                <a href="javascript:;">
                  <div className="text-center msg-footer">View All Notifications</div>
                </a>
              </div>
            </li>
            { user ? (
            <li className="nav-item dropdown dropdown-user-setting">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="user-setting">
                  <img src={user.avatar &&  user.avatar.url} alt={user && user.firstName + user.lastName} className="user-img" />
                </div>
              </a>
            
   <ul className="dropdown-menu dropdown-menu-end">
   <li>
     <a className="dropdown-item" href="javascript:;">
       <div className="d-flex flex-row align-items-center gap-2">
         <img src={user.avatar &&  user.avatar.url} alt={user && user.firstName + user.lastName} className="rounded-circle" width="54" height="54"/>
         <div className="">
           <h6 className="mb-0 dropdown-user-name">{user && user.firstName  +" "+ user.lastName   } </h6>
           <small className="mb-0 dropdown-user-designation text-secondary">UI Developer</small>
         </div>
       </div>
     </a>
   </li>
   <li>
     <hr className="dropdown-divider"/>
   </li>
   <li>
     <Link to={'/me'} className="dropdown-item" >
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="person-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Profile</span></div>
       </div>
     </Link>
   </li>
   <li>
     <a className="dropdown-item" href="javascript:;">
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="settings-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Setting</span></div>
       </div>
     </a>
   </li>
   
   <li>
     <a className="dropdown-item" href="javascript:;">
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="speedometer-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Dashboard</span></div>
       </div>
     </a>
   </li>
   <li>
     <a className="dropdown-item" href="javascript:;">
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="wallet-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Earnings</span></div>
       </div>
     </a>
   </li>
   <li>
     <a className="dropdown-item" href="javascript:;">
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="cloud-download-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Downloads</span></div>
       </div>
     </a>
   </li>
   <li>
     <hr className="dropdown-divider"/>
   </li>
   <li>
     <Link  className="dropdown-item" to={'/login'} onClick={lougoutHandler}>
       <div className="d-flex align-items-center">
         <div className="">
           <ion-icon name="log-out-outline"></ion-icon>
         </div>
         <div className="ms-3"><span>Logout</span></div>
       </div>
     </Link>
   </li>
 </ul>
 </li>
              ): !loading && <Link to={"/login"} className="btn ml-4"  id='login_btn'>Login</Link>}
           
          

          </ul>

        </div>
      </nav>
    </header>
    </Fragment>
  )
}

export default Header