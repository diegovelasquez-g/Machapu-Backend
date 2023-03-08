const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Machapu',{
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