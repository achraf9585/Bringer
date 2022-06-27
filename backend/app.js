const express = require('express')
const cookieParser = require('cookie-parser')
bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));


const errorMiddleware = require('./middlewares/errors')





//import all routes 
const categories = require('./routes/category')
const auth = require('./routes/auth')
const product = require('./routes/product')
app.use('/api/v1' , categories)
app.use('/api/v1' , auth)
app.use('/api/v1', product)

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app