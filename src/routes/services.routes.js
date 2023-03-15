const { Router } = require('express')
const { newService } = require('../controllers/services.controller')
const router = Router()
router.post("/newService", newService)

module.exports = router