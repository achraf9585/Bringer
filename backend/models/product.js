const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: { type: String, required: true},
    description: {type: String , required: true},
    ratings: {type: Number, default: 0},
    price: { type: Number, required: true, default:0.0},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
 
 }, { timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})


module.exports = mongoose.model('Product' ,productSchema)