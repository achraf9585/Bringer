import React , {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCategories } from '../actions/categoryActions'
import { getProducts } from '../actions/productActions'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import MetaData from '../Components/MetaData'


const Home = () => {
  const dispatch = useDispatch()
  const {productss}  = useSelector(state => state.products)
  const {categoriess}   = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  return (
	  <Fragment>
<MetaData title={'Acceuil Boutique '} />
<Header />
<br/> <br/> <br/> <br/>
<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div class="breadcrumb-title pe-3">Dashboard</div>
          <div class="ps-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0 p-0 align-items-center">
                <li class="breadcrumb-item"><a href="javascript:;">
                    <ion-icon name="home-outline"></ion-icon>
                  </a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">eCommerce</li>
              </ol>
            </nav>
          </div>
          <div class="ms-auto">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-dark">Settings</button>
              <button type="button"
                class="btn btn-outline-dark split-bg-dark dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"> <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end"> <a class="dropdown-item"
                  href="javascript:;">Action</a>
                <a class="dropdown-item" href="javascript:;">Another action</a>
                <a class="dropdown-item" href="javascript:;">Something else here</a>
                <div class="dropdown-divider"></div> <a class="dropdown-item" href="javascript:;">Separated link</a>
              </div>
            </div>
          </div>
        </div>

		<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-5">
          <div class="col">
            <div class="card radius-10">
              <div class="card-body">
                <div class="mx-auto widget-icon bg-light-dark text-dark">
                  <i class="bi bi-basket2-fill"></i>
                </div>
                <div class="text-center mt-3">
                  <h3 class="text-dark mb-1">{categoriess && categoriess.length}</h3>
                  <p class="text-muted mb-4">Total Categories</p>
                  <p class="text-dark mb-0 font-13"><i class="bi bi-arrow-up"></i><span>45.5%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card radius-10">
              <div class="card-body">
                <div class="mx-auto widget-icon bg-light-dark text-dark">
                  <i class="bi bi-wallet-fill"></i>
                </div>
                <div class="text-center mt-3">
                  <h3 class="text-dark mb-1">{productss && productss.length}</h3>
                  <p class="text-muted mb-4">Total Produits</p>
                  <p class="text-dark mb-0 font-13"><i class="bi bi-arrow-up"></i><span>24.5%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card radius-10">
              <div class="card-body">
                <div class="mx-auto widget-icon bg-light-dark text-dark">
                  <i class="bi bi-people-fill"></i>
                </div>
                <div class="text-center mt-3">
                  <h3 class="text-dark mb-1">5.6K</h3>
                  <p class="text-muted mb-4">Total Visitors</p>
                  <p class="text-dark mb-0 font-13"><i class="bi bi-arrow-down"></i><span>15.8%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card radius-10">
              <div class="card-body">
                <div class="mx-auto widget-icon bg-light-dark text-dark">
                  <i class="bi bi-chat-text-fill"></i>
                </div>
                <div class="text-center mt-3">
                  <h3 class="text-dark mb-1">752</h3>
                  <p class="text-muted mb-4">Total Comments</p>
                  <p class="text-dark mb-0 font-13"><i class="bi bi-arrow-up"></i><span>35.2%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card radius-10">
              <div class="card-body">
                <div class="mx-auto widget-icon bg-light-dark text-dark">
                  <i class="bi bi-bar-chart-fill"></i>
                </div>
                <div class="text-center mt-3">
                  <h3 class="text-dark mb-1">42.8%</h3>
                  <p class="text-muted mb-4">Bounce Rate</p>
                  <p class="text-dark mb-0 font-13"><i class="bi bi-arrow-down"></i><span>28.5%</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
		<Footer/>
	</Fragment>
  )
}

export default Home
