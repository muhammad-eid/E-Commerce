const router = require('express').Router()
const controller = require('../controllers/register.controller')
const auth = require('../middleware/auth')

router.post('/signup', controller.register)
router.post('/login', controller.login)
router.post('/logout', auth, controller.logout)
router.post('/confirm_email/:token', controller.confirmEmail)
router.post('/reset_passord/:token', controller.resetPassword)

module.exports=router