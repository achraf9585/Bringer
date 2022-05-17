const express = require('express')
const router = express.Router()


const {getCategories , newCategory , getSingleCategory , updateCategory , deleteCategory} = require('../controllers/categoryController')
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')


//router.route('/categories').get( isAuthenticatedUser, authorizedRoles('boutique'),getCategories);
router.route('/categories').get( getCategories);
router.route('/category/new').post(isAuthenticatedUser,authorizedRoles('boutique'),newCategory);
router.route('/category/:id').get(getSingleCategory);
router.route('/category/update/:id').put(isAuthenticatedUser,authorizedRoles('boutique'),updateCategory);
router.route('/category/delete/:id').delete(isAuthenticatedUser,authorizedRoles('boutique'),deleteCategory);
module.exports = router