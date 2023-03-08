const express = require('express')
const users = require("./src/routes/users.routes");
const app = express()
const PORT = 8080
const connectDB = require('./database')
const cors = require('cors')

//Starting Database connection
connectDB()


//Enabled cors
app.use(cors())

//Enabled body-parse
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Importing Routers
app.use("/api/users",users)  



//Creating the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

