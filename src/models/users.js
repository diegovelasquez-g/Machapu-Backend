const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Users',usersSchema)