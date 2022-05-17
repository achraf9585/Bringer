const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const  crypto = require('crypto')
const { send } = require('process')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// register a user  => /api/v1/register

exports.registerUser =catchAsyncErrors( async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })
const {username , email , password,phoneNumber,firstName,lastName  } = req.body
const user = await User.create({
    username,
    email,
    password,
    phoneNumber,
    firstName,
    lastName, 

    avatar: {
        public_id: result.public_id,
        url: result.secure_url
        //public_id: "avatars/za3ouba_fsau7i.jpg",
        //url: "https://res.cloudinary.com/dk48crbo1/image/upload/v1650687947/avatars/za3ouba_fsau7i.jpg"
    }
})

sendToken(user, 200, res)
 }) 

 //login user => /api/v1/login

 exports.loginUser =  async (req, res, next) => {
     const {email , password } = req.body

     //checks if email and password is entred by user 
     if (!email || !password){
          return next(new ErrorHandler('please enter email and password',400))
     }

     //finding user in DB
     const user = await User.findOne({ email}).select('+password')

     if(!user){
        return next(new ErrorHandler('Invalid email or password ',401))
     }
     //checks if password is correct or not
     const isPasswordMatched = await user.comparePassword(password)
     if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password ',401))
     }
     sendToken(user, 200, res)
 } 

// forgot password  /api/v1/password/forgot

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler('User not found with this email ',404))
    }
    //get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave: false })

    // create reset password url 

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password token is as follow : \n\n ${resetUrl} \n\n if you have not requested this email then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Bringer Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.userPasswordExpire = undefined
        await user.save({validateBeforeSave: false })

        return next( new ErrorHandler(error.message,500))
    }
}


// reset password  /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {

        // hash url token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })
        if(!user){
            return  next(new ErrorHandler('Password reset  token is invalid or has expired !',400))
        }
        if(req.body.password !== req.body.confirmPassword){
            return  next(new ErrorHandler('Password does not match !',400))

        }

        //setup new password 

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.userPasswordExpire = undefined

        await user.save()
        sendToken(user, 200 , res)
 
}

//get current user details  => /api/v1/me

exports.getUserProfile= async (req, res , next) => {
    console.log('aaaaaaaaaaaaaaaaaaaaa '+req.user.id)
    const user = await User.findById(req.user.id)



    res.status(200).json({
        success: true,
        user
     })
}

// update  / change password => /api/v1/password/update
exports.updatePassword= async (req, res , next) => {
    const user = await User.findById(req.user.id).select('+password')


    // check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrecct',400))
    }
    user.password = req.body.newPassword 
    await user.save()

    sendToken(user, 200, res)


}


//update user Profile => /api/v1/me/update
exports.updateProfile= async (req, res , next) => {
    const newUserData = { firstName: req.body.firstName,
                            lastName : req.body.lastName,
                            phoneNumber: req.body.phoneNumber,
                            email: req.body.email                                              
    }
// update avatar 
if (req.body.avatar !== ''){
    const user = await User.findById(req.user.id)

    const image_id =  user.avatar.public_id
    const res = await cloudinary.v2.uploader.destroy(image_id)

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url
    }
}

const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
    new: true,
    runValidators: true,
    useFindAndModify: false
})
res.status(200).json({
    success: true,

})

}


 // Logout user  => /api/v1/logout
 
 exports.logout = async (req,res,next) => {
     res.cookie('token' , null, {
         expires: new Date(Date.now()),
         httpOnly: true

     })

     res.status(200).json({
         success: true,
         message: 'Logged out'
      })
 }
