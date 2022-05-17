
const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

//setting up config file
dotenv.config({ path: 'config/config.env'})

//connecting to DB

connectDatabase()
// setup cloudinary 
cloudinary.config({
    cloud_name :  process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at  port ${process.env.PORT}  in ${process.env.NODE_ENV} mode `)
})
/*
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://achraf:achraf@bringer.oc13d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.get('/api/register', async (req,res) => {
    console.log(req.body)
    try {
    
    
        await User.create({
            username: req.body.username,
            phoneNumber:req.body.phoneNumber,
            password: req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error' , error: 'Duplicated Email or username !'})
    }
   

})




app.get('/api/login', async (req,res) => {
    
    
    
     const user = await  User.findOne({username: req.body.username, password: req.body.password })
    if(user){
        return res.json({status: 'ok' , user : true})
    }else{
        return res.json({status: 'error' , user : false}) 
    }
 
   
    
   

})

app.listen(5000,() => {
    console.log('Server started on 5000')
})*/