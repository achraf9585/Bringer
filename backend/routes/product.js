const express = require('express')
const router = express.Router()


const { deleteProduct, getProducts ,getSingleProduct , newProduct , updateProduct} = require('../controllers/productController')
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')


//router.route('/categories').get( isAuthenticatedUser, authorizedRoles('boutique'),getCategories);
router.route('/products').get( getProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizedRoles('boutique'),newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/update/:id').put(isAuthenticatedUser,authorizedRoles('boutique'),updateProduct);
router.route('/product/delete/:id').delete(isAuthenticatedUser,authorizedRoles('boutique'),deleteProduct);
module.exports = router