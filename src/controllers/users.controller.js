const usersModel = require('../models/users')
const getUsers = async (req, res) => {
    try{
        const users = await usersModel.find({})
        res.status(200).json(users)
    }
    catch(error){
        res.send('API ITS NOT RUNNING')
    }
}

const createUser = async (req,res) => {
    const {name,userName,email,password} = req.body
    console.log(req.body)

    try{
        const isUserExists = await usersModel.findOne({$or: [ {userName: userName} , { email: email } ]})
        if(isUserExists){
            return res.status(400).json({
                msg: 'This user already exists, try with another email / username'
            })
        }

        const newUser = new usersModel({name,userName,email,password})
        console.log(newUser)
        await newUser.save()
        res.json({
            msg: 'The user was created'
        })
    }
    catch(err){
        console.log(err)
        res.json({ msg: 'Something went wrong'})
    }
    
}


module.exports = {
    getUsers,
    createUser
}