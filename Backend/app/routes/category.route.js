const router = require('express').Router()
const controller = require('../controllers/category.controller')
const auth = require('../middleware/auth')

router.get('/', controller.getCategorys)
router.get('/:category', controller.getCategory)

router.post('/add', auth, controller.addCategory)
router.patch('/edit/:id', auth, controller.editCategory)
router.delete('/remove/:id', auth, controller.removeCategory)

module.exports=router