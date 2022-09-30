const router = require('express').Router()
const controller = require('../controllers/profile.controller')
const auth = require('../middleware/auth')

router.get('/', auth, controller.getPofile)
router.get('/:id', auth, controller.getPofile)//edit leter to enabe any one to view any profile without login

router.patch('/change_password', auth, controller.changePassword)
router.patch('/edit', auth, controller.editProfile)
router.patch('/edit_addresses', auth, controller.editAdresses)
router.delete('/delete', auth, controller.deleteProfile)

router.patch('/ban/:id', auth, controller.banProfile)
router.patch('/edit_profile_type/:id', auth, controller.editProfileType)

module.exports=router