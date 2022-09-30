const router = require('express').Router()
const controller = require('../controllers/product.controller')
const auth = require('../middleware/auth')

router.get('/:id', controller.getProduct)

router.post('/add', auth, controller.addProduct)
router.patch('/edit/:id', auth, controller.editProduct)
router.delete('/remove/:id', auth, controller.deleteProduct)

module.exports=router