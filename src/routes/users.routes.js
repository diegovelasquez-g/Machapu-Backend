const { Router } = require('express')
const { getUsers, createUser } = require('../controllers/users.controller')

const router = Router()

router.get("/",getUsers)

router.post("/newUser", createUser)

module.exports = router