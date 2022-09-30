const router = require('express').Router()
const controller = require('../controllers/cart.controller')
const auth = require('../middleware/auth')

router.get('/', controller.getCart)

router.post('/add', auth, controller.addItem)
router.patch('/edit/:id', auth, controller.editItem)
router.delete('/remove/:id', auth, controller.deleteItem)

module.exports=router