const  mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto =  require('crypto')
const { reset } = require('nodemon')


const User = new mongoose.Schema({
    username: {type: String, required: [true, 'Please enter a username'] ,  unique: [true,'this username is already exist']},
    phoneNumber: {type: String,required: [true, 'Please enter phone numbee'],
},
    password: {type: String, required:  [true, 'Please enter a password'], minlength: [6 , 'Your password is too short !'] , select: false},
    firstName: {type: String, required:  [true, 'Please enter a firstName']},
    lastName: {type: String, required:  [true, 'Please enter a lastName']},
    email:{type: String, required:  [true, 'Please enter a email'], unique: true , validate: [validator.isEmail, 'Please enter a valid email']} ,
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url :{
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

}, {
    collection: 'user'
})

// Encrypting password before saving user

User.pre('save' , async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password

User.methods.comparePassword = async function (entredPassword){
    return await bcrypt.compare(entredPassword, this.password)
}

// Retuur JWT token

User.methods.getJwtToken = function (){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//generate password reset token

User.methods.getResetPasswordToken = function (){
    //generate the token
    const resetToken =  crypto.randomBytes(20).toString('hex')

    // hash and set to resetpassword token

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

const model = mongoose.model('user' , User)

module.exports = model