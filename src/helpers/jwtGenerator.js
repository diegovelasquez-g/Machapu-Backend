const jwt = require('jsonwebtoken')
require("dotenv").config()
const key = process.env.SECRET

const generateToken = (user) => {
    const {id, userName} = user
    const token = jwt.sign({
        id,
        userName,
        exp: Date.now() + 180 * 1000
    },key)

    return token
}

module.exports = {
    generateToken
}