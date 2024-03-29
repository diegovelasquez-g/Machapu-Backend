const jwt = require('jsonwebtoken')
const key = process.env.SECRET
const usersModel = require('../models/users')

const authenticateJWT = async (req, res, next) =>{
    const authHeader = req.header('Authorization') 
    if(!authHeader){
        return res.status(401).json({
            msg: 'There is not token in the request'
        })
    }
    try{
        const token = authHeader.split(' ')[1]
        const { id, exp } = jwt.verify(token, key)
        const user = await usersModel.findById(id)
        if(!user){
            return res.status(401).json({
                msg: 'The token it is not valid'
            })
        }
        req.user = user
        next()
    
    }
    catch(error){
        res.status(401).json({
            msg: 'The token it is not valid'
        })
    }

}

module.exports = {
    authenticateJWT
}