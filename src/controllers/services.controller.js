const servicesModel = require('../models/services')

const newService = async (req,res,next) => {
    const {name, description, category, icon} = req.body
    try{
        const serviceExists = await servicesModel.findOne({name: name})
        if(serviceExists){
            res.status(400).json({msg: 'The service already exists'})
        }
        const newService = new servicesModel({name, description, category, icon})
        await newService.save()
        res.status(200).json({
            msg: 'The service has been created',
            newService
        })
    }
    catch(err){
        res.status(400).json({msg: 'Something went wrong'})
    }
}

module.exports = {
    newService
}