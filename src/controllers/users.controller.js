const usersModel = require('../models/users')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwtGenerator')
const { validateUpdatePassword } = require('../helpers/passwordHelper')

const getUsers = async (req, res) => {
    try{
        const users = await usersModel.find({})
        res.status(200).json(users)
    }
    catch(error){
        res.send(error)
    }
}

const createUser = async (req,res,next) => {
    const {name,userName,email,password} = req.body
    try{
        const isUserExists = await usersModel.findOne({$or: [ {userName: userName} , { email: email } ]})
        if(isUserExists){
            return res.status(400).json({
                msg: 'This user already exists, try with another email / username'
            })
        }
        const newUser = new usersModel({name,userName,email,password})
        //Generate a random 10 char string
        const salt = await bcrypt.genSaltSync(10)
        //Hashing the password
        newUser.password = await bcrypt.hashSync(password, salt)
        await newUser.save()
        res.json({msg: 'The user was created'})
    }
    catch(err){
        console.log(err)
        res.json({ msg: 'Something went wrong'})
        next()
    }
}

const signIn = async (req,res,next) => {
    const {userName, password} = req.body
    try{
        const user = await usersModel.findOne({userName: userName})
        if(!user){
            return res.status(400).json({msg: 'This user does not exists'})
        }
        //Compare the hashed password
        const validatePassword = await bcrypt.compare(password, user.password)
        if(!validatePassword){
            return res.status(400).json({msg: `The password it's not correct`})
        }
        //Generate Jwt
        const jwt = generateToken(user)
        res.status(201).json({
            user,
            msg: 'Succesfully login',
            jwt
        })
    }
    catch(err){
        res.json({msg: 'Something went wrong'})
        next()
    }
}

const changePassword = async (req,res,next) =>{
    const {newPassword, currentPassword} = req.body
    const {id} = req.user
    try{
        const user = await usersModel.findById(id)
        if(!user){
            res.status(400).json({msg: 'The user does not exists'})
        }
        //Validations
        const {mesg, isValid} = await validateUpdatePassword(user,newPassword,currentPassword)
        if(!isValid){
            res.status(400).json({msg: mesg})
        }
        else{
            //Update password
            const salt = await bcrypt.genSaltSync(10)
            const passwordUpdated = await bcrypt.hashSync(newPassword, salt)
            await usersModel.findOneAndUpdate({_id: id},{password: passwordUpdated},{new: true})
            res.status(201).json({msg: 'The password has been updated'})
        }
    }
    catch(err){
        res.status(401).json({msg: "Something went wrong"})
        next()
    }
}

module.exports = {
    getUsers,
    createUser,
    signIn,
    changePassword
}