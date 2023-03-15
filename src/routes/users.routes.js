const { Router } = require('express')
const { getUsers, createUser, signIn, changePassword } = require('../controllers/users.controller')
const { authenticateJWT } = require('../middlewares/jwtAuth')
const router = Router()

router.get("/", authenticateJWT, getUsers)

router.post("/newUser", createUser)

router.post("/signIn", signIn)

router.post("/changePassword",authenticateJWT, changePassword)

module.exports = router