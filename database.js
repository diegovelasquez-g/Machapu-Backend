const mongoose = require('mongoose')
require("dotenv").config()
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB its working")
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB