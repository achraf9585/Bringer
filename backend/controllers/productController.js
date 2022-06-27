const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// create new product => /api/v1/product/new

exports.newProduct = async (req, res, next) => {

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    let imagesLinks = []
    for (let i=0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: 'products',
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
} 



exports.getProducts =  async (req , res , next) => {

    const resPerPage = 10
    const productCount =   await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find(), req.query).search()
                                                                    .filter()
                                                                    .pagination(resPerPage)
    const products = await apiFeatures.query
    const productss = await Product.find().populate('category')
    setTimeout(() => {
        res.status(200).json({
            success: true,
            productCount,
           products,
           productss
        })  
    }, 1000);
   
}

// get one Product  /api/v1/product/:id

exports.getSingleProduct =  async (req , res , next) => {
    const product = await Product.findById(req.params.id).populate('category')
    console.log("ZAK MARIO " + product)
    if(!product){
        return next(new ErrorHandler('product not found !' , 404))
    }
    res.status(200).json({
        success: true,

        product
    })
}

// update product  /api/v1/product/update/:id

exports.updateProduct =  async (req , res , next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }
    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }
    if (images !== undefined){
        // deleting image  assosiated to product
    for (let i = 0 ; i < product.images.length; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    let imagesLinks = []
    for (let i=0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: 'products',
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    }

    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            product
        })
}



// delete product  /api/v1/product/delete/:id

exports.deleteProduct =  async (req , res , next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }

    // deleting image  assosiated to product
    for (let i = 0 ; i < product.images.length; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
       await product.remove()

        res.status(200).json({
            success: true,
            message: 'product is deleted'
            
        })
}