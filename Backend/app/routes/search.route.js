const router = require('express').Router()
const controller = require('../controllers/search.controller')

router.get('/', auth, controller.search)

module.exports=router