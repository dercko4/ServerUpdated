const Router = require('express')
const router = new Router()
const editProfileRoutes = require('../controlles/editProfileController')
const authMiddleware = require('../authMiddleware')

router.patch('/edit_profile', authMiddleware, editProfileRoutes.changeProfile)

module.exports = router