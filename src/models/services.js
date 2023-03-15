const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Services',servicesSchema)