const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    name: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
 
 }, { timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})


module.exports = mongoose.model('Category' ,categorySchema)