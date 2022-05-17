const ErrorHandler = require('../utils/errorHandler')

module.exports = (err  ,  req , res , next) => {
    err.statusCode =  err.statusCode || 500
    //wrong mongoose object ID error

    if(err.name === 'castError'){
        const message = `Ressource not found. invalid ${err.path}`
        const error = new ErrorHandler(message, 400)
    }

// handling mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entred`
        const error = new ErrorHandler(message, 400)

    }

    // Handling wrong JWT error 
    if(err.name === 'JsonWebTokenError'){
        const message ='Json Web Token is invalid'
        const error = new ErrorHandler(message, 400)
    }

     // Handling expired JWT error 
     if(err.name === 'TokenExpiredError'){
        const message ='Json Web Token is expired'
        const error = new ErrorHandler(message, 400)
    }


    //handling validation errors
    if(err.name === 'validationError'){
        const message = Object.values(err.errors).map(value => value.message)
        const error = new ErrorHandler(message, 400)
    }
    err.message = err.message || 'Internal Server Error'
    res.status(err.statusCode).json({
        success: false,
        error: err.stack
    })
}