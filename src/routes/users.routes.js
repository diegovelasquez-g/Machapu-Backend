const { Router } = require('express')
const { getUsers, createUser, signIn } = require('../controllers/users.controller')

const router = Router()

router.get("/",getUsers)

router.post("/newUser", createUser)

router.post("/signIn", signIn)

module.exports = router