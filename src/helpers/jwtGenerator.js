const jwt = require('jsonwebtoken')
require("dotenv").config()
const key = process.env.SECRET

const generateToken = (user) => {
    const {id, userName} = user
    const token = jwt.sign({
        id,
        userName
    },key, {expiresIn: '1d'})

    return token
}

module.exports = {
    generateToken
}