const Category = require('../models/category')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')

// create new category => /api/v1/category/new

exports.newCategory = async (req, res, next) => {

    req.body.user = req.user.id
    const category = await Category.create(req.body);

    res.status(200).json({
        success:true,
        category
    })
} 



exports.getCategories =  async (req , res , next) => {

    const resPerPage = 10
    const categoryCount =   await Category.countDocuments()
    const apiFeatures = new APIFeatures(Category.find(), req.query).search()
                                                                    .filter()
                                                                    .pagination(resPerPage)
    const categories = await apiFeatures.query
    const categoriess = await Category.find()
    setTimeout(() => {
        res.status(200).json({
            success: true,
             categoryCount,
           categories,categoriess
        })  
    }, 1000);
   
}

// get one category  /api/v1/category/:id

exports.getSingleCategory =  async (req , res , next) => {
    const category = await Category.findById(req.params.id)
    if(!category){
        return next(new ErrorHandler('category not found !' , 404))
    }
    res.status(200).json({
        success: true,

        category
    })
}

// update category  /api/v1/category/update/:id

exports.updateCategory =  async (req , res , next) => {
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(404).json({
            success: false,
            message: 'category not found'
        })
    }
        category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            category
        })
}



// delete category  /api/v1/category/delete/:id

exports.deleteCategory =  async (req , res , next) => {
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(404).json({
            success: false,
            message: 'category not found'
        })
    }
       await category.remove()

        res.status(200).json({
            success: true,
            message: 'category is deleted'
            
        })
}