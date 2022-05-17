const mongoose = require('mongoose')

const connectDatabase = () => {
mongoose.connect('mongodb+srv://achraf:achraf@bringer.oc13d.mongodb.net/bringer?retryWrites=true&w=majority')
.then(con => {
    console.log(`MongoDB database connected  with  host  ${con.connection.host}` )
})
}

module.exports = connectDatabase